# TechGem Website

A modern, responsive technology company profile and service platform built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Supabase.

# I've created a complete GitHub-ready README.md containing:

TechGem introduction
Complete technology stack
Architecture
Project folder structure
Database architecture
Authentication architecture
RLS/security explanation
User/admin roles
Supabase setup
Environment variables
Clone instructions
Dependency installation
Development commands
Production build commands
Type checking
ESLint
Deployment
Troubleshooting
Git contribution workflow
Security recommendations

📌 About TechGem

TechGem is a technology company project created to present and manage technology solutions and services offered by a team of developers.

The website combines a premium corporate landing experience with application functionality such as:

Company/service showcase

About and team sections

Contact and enquiry submission

Appointment/service request management

User registration and login

User dashboard

Admin dashboard

Supabase-backed authentication and database

Role-based admin access

Responsive light/dark UI

Animated and interactive UI components

The project is designed as a production-oriented single-page web application rather than a static company website.

🛠️ Technologies Used

Frontend

Technology

Purpose

React 18

Component-based UI development

TypeScript 5

Type-safe application development

Vite 5

Development server and production build tooling

React Router 7

Client-side routing

Tailwind CSS 3

Utility-first styling

Framer Motion

Animations and page/component transitions

Lucide React

Icons

Backend / BaaS

Technology

Purpose

Supabase

Authentication, PostgreSQL database, Row Level Security and RPC functions

Supabase Auth

User authentication and session management

PostgreSQL

Application database

Supabase RPC / PostgreSQL Functions

Secure admin operations

The project does not use a traditional Express/Node.js REST backend. Supabase acts as the backend-as-a-service layer.

Development & Quality Tools

ESLint

TypeScript compiler

PostCSS

Autoprefixer

npm

Git / GitHub

🏗️ Architecture

TechGem follows a React + Supabase client architecture.

┌───────────────────────┐


                TechGem UI                  


           React + TypeScript               

└─────────┬─────────────┘
         
          │
          ▼
  ┌────────────┴────────────┐
  
  
          │                         │
   React Router              React Context
  
          │                         │
          │                 ┌───────┴────────┐
          │                 │                │
          │             AuthContext     ThemeContext
          │
   
   ┌──────┴───────────────────────────────────┐
    
                    Pages                     
   
    Home / About / Contact / Login /        
    
    Register / UserDashboard / AdminDashboard
   
   └──────────────────────┬───────────────────┘
   
                          │
                          
                          │ Supabase Client
                          
                          ▼
   ┌──────────────────────────────────────────┐
        
                    Supabase                 
                                             
     Supabase Auth                           
     
          │                                  
          
          ▼                                  
     
     PostgreSQL Database                     
     
          │                                  
          
          ├── profiles                       
          
          ├── appointments                   
          
          └── contact_submissions            
                                        
     Row Level Security + RPC Functions      

   └──────────────────────────────────────────┘


Application flow



Normal user

Register

   ↓

Supabase Auth

   ↓

profiles table

   ↓

role = user

   ↓

User Dashboard


Admin


Admin Login

   ↓

Supabase Auth

   ↓

profiles.role

   ↓

role = admin

   ↓

Admin Dashboard

   ↓

Secure Supabase RPC functions


The current codebase already contains an admin-role concept in the profiles table and admin RPC functions. Public registration creates users with the default user role.

📁 Project Structure

TechGem-Website/

│

├── public/

│   └── favicon.png

│

├── src/

│   │

│   ├── components/

│   │   ├── assets/

│   │   │   ├── team/

│   │   │   └── favicon.png

│   │   │

│   │   ├── chatbot/

│   │   │   └── Chatbot.tsx

│   │   │

│   │   ├── common/

│   │   │   ├── Logo.tsx

│   │   │   └── TechGemLogo3D.tsx

│   │   │

│   │   ├── footer/

│   │   │   └── Footer.tsx

│   │   │

│   │   ├── hero/

│   │   │   ├── ContentSlider.tsx

│   │   │   └── Hero.tsx

│   │   │

│   │   ├── navbar/

│   │   │   └── Navbar.tsx

│   │   │

│   │   ├── services/

│   │   │   ├── Services.tsx

│   │   │   └── WhyChooseUs.tsx

│   │   │

│   │   └── team/

│   │       └── TeamShowcase.tsx

│   │

│   ├── context/

│   │   ├── AuthContext.tsx

│   │   └── ThemeContext.tsx

│   │

│   ├── lib/

│   │   ├── data.ts

│   │   └── supabase.ts

│   │

│   ├── pages/

│   │   ├── Home.tsx

│   │   ├── About.tsx

│   │   ├── Contact.tsx

│   │   ├── Login.tsx

│   │   ├── Register.tsx

│   │   ├── UserDashboard.tsx

│   │   └── AdminDashboard.tsx

│   │

│   ├── App.tsx

│   ├── index.css

│   └── main.tsx

│

├── supabase/

│   └── migrations/

│       └── create_techgems_schema.sql

│

├── .env

├── .gitignore


├── eslint.config.js

├── package.json

├── package-lock.json

├── postcss.config.js

├── tailwind.config.js

├── tsconfig.json

├── tsconfig.app.json

├── tsconfig.node.json

└── vite.config.ts

🗄️ Database Architecture

The Supabase database currently contains three main application tables.

1. profiles

Stores application-level information for authenticated users.

Important fields:

id
full_name
phone
role
created_at

The role field distinguishes:

user
admin

Newly registered accounts are created with:

role = user

2. appointments

Stores appointment/service requests.

Important fields:

id
user_id
service
date
appointment_time
message
status
created_at

Appointment statuses include:

pending
confirmed
completed
cancelled

3. contact_submissions

Stores messages submitted through the public contact form.

Important fields:

id
name
email
phone
subject
message
status
created_at

Message statuses include:

new
read
archived

🔐 Authentication & Security

TechGem uses Supabase Auth for authentication.

The frontend uses:

supabase.auth.signUp()
supabase.auth.signInWithPassword()
supabase.auth.signOut()
supabase.auth.getSession()
supabase.auth.onAuthStateChange()

The application profile is loaded from the profiles table after authentication.

Row Level Security

RLS is enabled for the application tables.

Users are restricted to their own profile and appointment records.

Administrative operations are handled through PostgreSQL SECURITY DEFINER functions with an admin-role check.

Examples of admin RPC operations include:

admin_list_appointments
admin_list_contact_submissions
admin_list_profiles
admin_update_appointment_status
admin_update_contact_status
admin_delete_contact_submission

Security note: Never commit private Supabase service-role keys, database passwords, or other server secrets to GitHub.

🚀 Getting Started

Prerequisites

Install the following before running the project:

Node.js 18+ recommended

npm

Git

A Supabase project

Check your installed versions:

node -v
npm -v
git --version

📥 Clone the Repository

Replace the repository URL with the actual GitHub repository URL if it differs.

git clone https://github.com/Sumityagik/TechGem-Website.git

Move into the project directory:

cd TechGem-Website

📦 Install Dependencies

Install all project dependencies:

npm install

This installs the dependencies defined in package.json and uses package-lock.json for reproducible installation.

Main runtime dependencies

npm install react react-dom react-router-dom @supabase/supabase-js framer-motion lucide-react

If you already ran npm install, do not run the command above again. npm install is sufficient because these packages are already declared in package.json.

Development dependencies

The project already declares its development dependencies. A fresh setup can install them automatically using:

npm install

The project uses:

TypeScript
Vite
Tailwind CSS
PostCSS
Autoprefixer
ESLint
React type definitions
Vite React plugin
TypeScript ESLint

🔑 Configure Environment Variables

Create a .env file in the project root:

TechGem-Website/
├── .env
├── package.json
└── src/

Add:

VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

Get these values from your Supabase project's API settings.

Important

Do not commit .env to GitHub.

The repository already ignores .env through .gitignore.

For Vite, variables exposed to frontend code must use the VITE_ prefix.

🗃️ Configure Supabase Database

The project contains a SQL migration under:

supabase/migrations/

Run the SQL migration in your Supabase SQL Editor.

The migration creates the required:

profiles

appointments

contact_submissions

tables

Row Level Security policies

Admin helper functions

Admin RPC functions

After running the migration, verify the tables and functions in your Supabase project.

▶️ Run the Development Server

Start the Vite development server:

npm run dev

Vite will display the local development URL, normally similar to:

http://localhost:5173

Open the displayed URL in your browser.

🏭 Create a Production Build

Build the application:

npm run build

The production files are generated in:

dist/

Preview the production build locally:

npm run preview

🧪 Code Quality Commands

Run ESLint:

npm run lint

Run TypeScript type checking:

npm run typecheck

A useful verification sequence before pushing to GitHub is:

npm run lint
npm run typecheck
npm run build

If all three commands complete successfully, the project is ready for deployment.

🔄 Complete Fresh Setup

For a developer cloning the repository for the first time:

git clone https://github.com/Sumityagik/TechGem-Website.git
cd TechGem-Website
npm install

Create .env:

VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

Configure the Supabase database using the migration SQL, then run:

npm run dev

📌 Available npm Scripts

Command

Description

npm run dev

Starts Vite development server

npm run build

Creates production build

npm run preview

Previews production build

npm run lint

Runs ESLint

npm run typecheck

Runs TypeScript type checking

🎨 UI & Design

TechGem uses a modern corporate technology aesthetic with:

Cyan/electric blue accents

Gold/yellow highlights

Light and dark themes

Glassmorphism-inspired components

Responsive layouts

Motion-based interactions

Animated hero sections

Interactive team cards

Responsive navigation

Modern dashboard interfaces

The styling system is primarily implemented with Tailwind CSS and project-specific utility classes in src/index.css.

🌐 Routing

The main application routes include:

/                  → Home
/about             → About
/contact           → Contact
/login             → Login
/register          → User Registration
/dashboard         → User Dashboard
/admin             → Admin Dashboard

Authentication and role checks determine whether a user should access the user or admin dashboard.

👥 User & Admin Roles

TechGem currently separates application users into two roles:

User

Normal registered customers/users can:

Create an account

Log in

Access their dashboard

Submit/manage appointment requests

Interact with company services

Admin

Administrators can access the admin dashboard and manage:

Users

Appointments

Contact messages

Appointment statuses

Message statuses

Admin access is based on the user's application role rather than simply having a valid Supabase account.

🔧 Troubleshooting

npm install problems

Delete the installed dependencies and lockfile only if you understand the consequences, then reinstall:

rm -rf node_modules package-lock.json
npm install

On Windows Command Prompt:

rmdir /s /q node_modules
del package-lock.json
npm install

Normally, however, simply running:

npm install

is preferred.

Supabase connection errors

Check:

VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...

Then restart the Vite server:

npm run dev

Vite environment variables are loaded when the development server starts.

Authentication/profile problems

Check that:

The Supabase project is running.

The required tables exist.

RLS policies were created.

The profiles record exists for the authenticated user.

The user's role is correct.

The migration's admin functions exist in Supabase.

🚢 Deployment

Because TechGem is a Vite React application, it can be deployed to modern frontend hosting platforms such as:

Vercel

Netlify

Cloudflare Pages

GitHub Pages with appropriate SPA configuration

Other static hosting platforms supporting Vite builds

For deployment, configure the same environment variables in the hosting provider:

VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

Build command:

npm run build

Output directory:

dist

🔒 Security Recommendations

Before making the application publicly available:

Keep .env out of Git.

Never expose a Supabase service-role key in frontend code.

Keep RLS enabled.

Validate admin access on the Supabase/database side, not only in React.

Avoid public admin registration.

Use strong administrator credentials.

Configure appropriate Supabase Auth settings.

Review all database policies before production deployment.

🤝 Contributing

Contributions are welcome.

Typical workflow:

git clone <repository-url>
cd TechGem-Website
npm install

Create a feature branch:

git checkout -b feature/your-feature-name

Make changes and verify:

npm run lint
npm run typecheck
npm run build

Commit:

git add .
git commit -m "Add your feature"

Push:

git push origin feature/your-feature-name

Then open a Pull Request on GitHub.

📄 License

Add the project's preferred license here, such as MIT, if the project is intended to be open source.

👨‍💻 TechGem

TechGem — Technology solutions, services, and digital innovation.

Built with:

React • TypeScript • Vite • Tailwind CSS • Supabase • Framer Motion
