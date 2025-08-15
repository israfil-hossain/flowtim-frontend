# Flowtim - Modern Project Management Platform

A comprehensive team collaboration and project management platform built with React, TypeScript, and Node.js.

## 🏗️ Architecture Overview

### Tech Stack
- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js (Google OAuth + Email/Password)
- **State Management**: TanStack Query (React Query)
- **UI**: Radix UI + Tailwind CSS + shadcn/ui
- **Form Management**: React Hook Form + Zod validation

### Project Structure
```
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # API client & utilities
│   │   ├── page/           # Page components
│   │   ├── routes/         # Route configuration
│   │   └── types/          # TypeScript type definitions
└── backend/                # Backend Express app
    ├── src/
    │   ├── controllers/    # Request handlers
    │   ├── models/         # MongoDB schemas
    │   ├── services/       # Business logic
    │   ├── routes/         # API routes
    │   └── validation/     # Input validation schemas
```

## 🚀 Core Features

### 1. Authentication System
- **Email/Password Registration & Login**
- **Google OAuth Integration**
- **Session-based authentication with cookies**
- **Protected routes with role-based access**

### 2. Workspace Management
- **Multi-workspace support**
- **Workspace creation with auto-assignment as owner**
- **Invite system with unique invite codes**
- **Workspace switching capability**

### 3. Project Management
- **Project creation within workspaces**
- **Project details with emoji support**
- **Project-based task organization**
- **Project analytics and overview**

### 4. Task Management
- **Task creation and editing**
- **Task priority levels (Low, Medium, High)**
- **Task status tracking**
- **Project-specific task organization**

### 5. Team Collaboration
- **Member management**
- **Role-based permissions (Owner, Admin, Member)**
- **Workspace member role changes**
- **Team analytics and insights**

### 6. User Management
- **User profiles with avatars**
- **Current workspace tracking**
- **Activity tracking**

## 🔧 Technical Features

### Database Models
- **User**: Profile, authentication, workspace association
- **Workspace**: Team organization with invite codes
- **Project**: Project management within workspaces
- **Member**: Workspace membership with roles
- **Role**: Permission system with granular controls

### API Architecture
- **RESTful API design**
- **Middleware for authentication**
- **Error handling with custom exceptions**
- **Input validation with Zod schemas**

### Frontend Architecture
- **Component-based React architecture**
- **Custom hooks for API calls**
- **Type-safe API client with Axios**
- **Form handling with React Hook Form**
- **Route protection and navigation**

### Security Features
- **Password hashing with bcrypt**
- **Session management**
- **CORS configuration**
- **Input sanitization and validation**
- **Role-based access control**

## 📊 Data Flow

1. **User Registration/Login** → Creates workspace → Assigns owner role
2. **Workspace Selection** → Loads projects and members
3. **Project Creation** → Enables task management
4. **Task Management** → Tracks progress and assignments
5. **Team Collaboration** → Invite members, assign roles

## 🎯 Permission System

### Roles
- **Owner**: Full workspace control
- **Admin**: Manage projects, tasks, and members
- **Member**: Create and manage own tasks

### Permissions
- Workspace management (create, edit, delete)
- Member management (add, remove, change roles)
- Project management (create, edit, delete)
- Task management (create, edit, delete)
- Settings access

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
