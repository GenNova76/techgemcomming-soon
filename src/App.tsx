import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import Chatbot from '@/components/chatbot/Chatbot';
import { useAuth } from '@/context/AuthContext';


const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const UserDashboard = lazy(() => import('@/pages/UserDashboard'));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="w-8 h-8 border-2 border-electric-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function ConditionalChrome({ children }: { children: React.ReactNode }) {
  const { user, profile } = useAuth();
  const isAuthPage = window.location.pathname === '/login' || window.location.pathname === '/register';
  const isAdminPage = window.location.pathname === '/admin';

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className={isAdminPage ? '' : 'min-h-screen'}>
        {children}
      </main>
      {!isAdminPage && <Footer />}
      <Chatbot />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ConditionalChrome>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminRoute />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </ConditionalChrome>
    </BrowserRouter>
  );
}

function AdminRoute() {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <PageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (profile?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <AdminDashboard />;
}

export default App;
