import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase, type Profile } from '@/lib/supabase';

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: string | null; role: 'user' | 'admin' | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (uid: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', uid)
      .maybeSingle();

    if (error) {
      console.error('Profile load error:', error.message);
      setProfile(null);
      return null;
    }

    if (data) {
      const typedProfile = data as Profile;
      setProfile(typedProfile);
      return typedProfile;
    }

    // Profile doesn't exist yet — create it
    const { data: newProfile, error: insertError } = await supabase
      .from('profiles')
      .insert({
        id: uid,
        full_name: '',
        role: 'user',
      })
      .select('*')
      .maybeSingle();

    if (insertError) {
      console.error('Profile creation error:', insertError.message);
      setProfile(null);
      return null;
    }

    if (newProfile) {
      const typedProfile = newProfile as Profile;
      setProfile(typedProfile);
      return typedProfile;
    }

    return null;
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        await loadProfile(session.user.id);
      }

      if (mounted) {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        if (!session?.user) {
          setProfile(null);
          setLoading(false);
          return;
        }

        // Let Supabase finish its auth callback before querying the database.
        setLoading(true);

        setTimeout(async () => {
          if (!mounted) return;

          await loadProfile(session.user.id);

          if (mounted) {
            setLoading(false);
          }
        }, 0);
      }
    );

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (
    email: string,
    password: string,
    fullName: string
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      return { error: error.message };
    }

    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        full_name: fullName,
        role: 'user',
      });

      if (profileError) {
        console.error('Profile creation error:', profileError.message);
      }
    }

    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        error: error.message,
        role: null,
      };
    }

    if (!data.user) {
      return {
        error: 'Login failed. User not found.',
        role: null,
      };
    }

    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .maybeSingle();

    if (profileError) {
      return {
        error: profileError.message,
        role: null,
      };
    }

    const role =
      profileData?.role === 'admin'
        ? 'admin'
        : 'user';

    return {
      error: null,
      role,
    };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setProfile(null);
  };

  const refreshProfile = async () => {
    if (user) {
      await loadProfile(user.id);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        loading,
        signUp,
        signIn,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return ctx;
}