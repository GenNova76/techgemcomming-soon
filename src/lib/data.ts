

export const SERVICES = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Modern, scalable and responsive websites and web applications built with cutting-edge frameworks.',
    icon: 'Globe',
    features: ['React & Next.js', 'Responsive Design', 'SEO Optimized', 'Performance Tuned'],
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    description: 'Cross-platform and custom mobile application solutions for iOS and Android.',
    icon: 'Smartphone',
    features: ['iOS & Android', 'React Native', 'Native Performance', 'App Store Ready'],
  },
  {
    id: 'ai-machine-learning',
    title: 'AI & Machine Learning',
    description: 'AI integrations, automation, intelligent applications and data-driven solutions.',
    icon: 'BrainCircuit',
    features: ['LLM Integration', 'Predictive Models', 'Computer Vision', 'Process Automation'],
  },
  {
    id: 'Offline/Online Workshop',
    title: 'Offline/Online Workshop',
    description: 'Practical, hands-on training for teams and individuals in trending core technologies',
    icon: 'Users',
    features: ['Artificial Intelligence', 'Machine Learning', 'Web Development'],
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Modern interfaces focused on usability and exceptional user experience.',
    icon: 'PenTool',
    features: ['Design Systems', 'User Research', 'Prototyping', 'Accessibility'],
  },
  {
    id: 'custom-software',
    title: 'Custom Software',
    description: 'Tailored software solutions designed around your business requirements.',
    icon: 'Code2',
    features: ['Bespoke Architecture', 'API Integration', 'Legacy Modernization', 'Enterprise Scale'],
  },
] as const;

export const HERO_SLIDES = [
  {
    title: 'Who We Are',
    description: 'TechGems is a premium technology company crafting digital solutions that combine innovation, precision, and reliability.',
    icon: 'Sparkles',
    cta: 'Learn More',
    ctaLink: '/about',
  },
  {
    title: 'What We Do',
    description: 'From web platforms to AI-powered systems, we build technology that drives real business outcomes.',
    icon: 'Rocket',
    cta: 'Our Services',
    ctaLink: '/#services',
  },
  {
    title: 'How We Build',
    description: 'We follow a modern development approach — agile, collaborative, and quality-driven from concept to launch.',
    icon: 'Workflow',
    cta: 'Get Started',
    ctaLink: '/register',
  },
  {
    title: 'Why TechGems',
    description: 'Security-first architecture, scalable code, and a team that treats your product like a gem — refined and valuable.',
    icon: 'ShieldCheck',
    cta: 'Book Appointment',
    ctaLink: '/contact',
  },
  {
    title: 'Our Vision',
    description: 'To become the most trusted technology partner for businesses seeking to transform ideas into digital gems.',
    icon: 'Eye',
    cta: 'Join Us',
    ctaLink: '/register',
  },
] as const;

export const TEAM_MEMBERS = [
  {
    name: 'Devesh Sahu',
    role: 'Founder & CEO',
    bio: 'Visionary leader with 3+ years in software architecture and product strategy.',
    image: 'https://lkagcztregnlydltoivz.supabase.co/storage/v1/object/public/team/Devesh-photo.jpeg',

    socials: {
      linkedin: 'https://www.linkedin.com/in/devesh-sahu-560608270',
      github: 'https://github.com/Deveshsahu76',
      email: 'deveshsahu567@gmail.com',
    },
  },
  {
    name: 'Sumit Yagik',
    role: 'Full Stack Developer',
    bio: 'Full-stack expert specializing in scalable systems and Websites.',
    image: 'https://lkagcztregnlydltoivz.supabase.co/storage/v1/object/public/team/Sumit-photo.png',

    socials: {
      linkedin: "https://www.linkedin.com/in/sumit-yagik-26b588259/",
      github: "https://github.com/Sumityagik",
      email: "yagiksumit001@gmail.com",
    },
  },
  {
    name: 'Ayush Pandey',
    role: 'UI/UX Director',
    bio: 'Design thinker crafting beautiful, accessible, and intuitive interfaces.',
    image: 'https://lkagcztregnlydltoivz.supabase.co/storage/v1/object/public/team/Ayush-photo.png',

    socials: {
      linkedin: "https://www.linkedin.com/in/ayush-pandey-9245932a6",
      github: "#",
      email: "ayushpdy05@gmail.com",
    },
  },
  {
    name: 'Saksham Singh',
    role: 'Client Support Executive',
    bio: 'Dedicated support professional driving customer satisfaction, rapid resolution, and seamless experiences.',
    image: 'https://lkagcztregnlydltoivz.supabase.co/storage/v1/object/public/team/Saksham-photo.jpeg',
    
    socials: {
      linkedin: "https://www.linkedin.com/in/saksham-singh-7671a12a7?",
      github: "https://github.com/Saksham0986",
      email: "sakshamsingh2788@gmail.com",
    },
  },
  {
    name: 'Deepak Sahu',
    role: 'Social Media Manager',
    bio: 'Crafting stories and strategy to amplify tech brands and grow engaged communities.',
    image: 'https://lkagcztregnlydltoivz.supabase.co/storage/v1/object/public/team/Deepak-photo.png', 
  
    socials: {
      linkedin: "https://www.linkedin.com/in/deepak-sahu-910510328",
      github: "https://github.com/Deepak-sahu9651",
      email: "Sahudeepak9651@gmail.com",
    },  
  },
  {
    name: 'Bhumi Singh',
    role: 'Frontend Developer',
    bio: 'Specializing in building responsive, accessible, and high-performance web applications that deliver seamless user experiences.',
    image: 'https://lkagcztregnlydltoivz.supabase.co/storage/v1/object/public/team/Bhumi-photo.png', 
  
    socials: {
      linkedin: "https://www.linkedin.com/in/bhumi-singh-33605335a",
      github: "https://github.com/Bhumi678",
      email: "bhumisingh123b@gmail.com",
    },  
  },
  {
    name: 'Gaurav Gupta',
    role: 'Backend Developer',
    bio: 'Focused on architecting scalable APIs, optimizing database performance, and building secure systems.',
    image: 'https://lkagcztregnlydltoivz.supabase.co/storage/v1/object/public/team/Gaurav-photo.png', 
  
    socials: {
      linkedin: "https://www.linkedin.com/in/gaurav-gupta-b203171b5",
      github: "https://github.com/gaurav19-hack",
      email: "gauravgupta2723@gmail.com",
    },  
  },
] as const;

export const WHY_CHOOSE_US = [
  {
    title: 'Innovative Solutions',
    description: 'We push boundaries with cutting-edge technology and creative problem-solving.',
    icon: 'Lightbulb',
  },
  {
    title: 'Security First',
    description: 'Every solution is built with security as a foundational principle, not an afterthought.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Scalable Architecture',
    description: 'Systems designed to grow with your business, from startup to enterprise.',
    icon: 'Layers',
  },
  {
    title: 'Modern Technology',
    description: 'We use the latest frameworks and tools to keep you ahead of the curve.',
    icon: 'Cpu',
  },
  {
    title: 'Client-Centric Development',
    description: 'Your goals drive our process. We build with your users in mind.',
    icon: 'HeartHandshake',
  },
  {
    title: 'Fast & Efficient Delivery',
    description: 'Agile workflows mean faster iterations and quicker time to market.',
    icon: 'Zap',
  },
  {
    title: 'AI-Powered Innovation',
    description: 'We integrate AI where it matters — automating, enhancing, and elevating.',
    icon: 'BrainCircuit',
  },
  {
    title: 'Long-Term Support',
    description: 'We are your partner beyond launch, providing ongoing support and evolution.',
    icon: 'Infinity',
  },
] as const;

export const VALUES = [
  { title: 'Innovation', description: 'We embrace new ideas and technologies to solve real problems.', icon: 'Lightbulb' },
  { title: 'Integrity', description: 'We are transparent, honest, and accountable in everything we do.', icon: 'ShieldCheck' },
  { title: 'Quality', description: 'We hold ourselves to the highest standards in code and design.', icon: 'Gem' },
  { title: 'Collaboration', description: 'We work as an extension of your team, not just a vendor.', icon: 'Users' },
  { title: 'Security', description: 'We protect your data and your users with rigorous security practices.', icon: 'Lock' },
  { title: 'Continuous Learning', description: 'We never stop growing, exploring, and refining our craft.', icon: 'BookOpen' },
] as const;

export const JOURNEY = [
  { year: '2021', title: 'The Spark', description: 'TechGems is founded with a vision to craft technology like a gem.' },
  { year: '2022', title: 'First Products', description: 'Launched our first client platforms and grew the core engineering team.' },
  { year: '2023', title: 'AI Integration', description: 'Expanded into AI and machine learning, building intelligent systems.' },
  { year: '2024', title: 'Cloud Scale', description: 'Deployed enterprise-grade cloud infrastructure for global clients.' },
  { year: '2025', title: 'Digital Transformation', description: 'Partnered with businesses to drive full digital transformation.' },
  { year: '2026', title: 'The Future', description: 'Continuing to refine technology into digital gems that shine.' },
] as const;

export const TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
] as const;
