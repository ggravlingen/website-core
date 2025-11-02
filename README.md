# Regtech Partners

A React application built with Vite, Material-UI, and React Router for fast development and modern UI components.

## Features

- **Material-UI**: Modern React UI framework with consistent design system
- **React Router**: Client-side routing for single-page application navigation
- **Navigation Bar**: Clean navigation with LinkedIn integration
- **Path Aliases**: Organized imports using `@/` aliases
- **Responsive Design**: Mobile-friendly Material-UI components

## Navigation Structure

- **Home**: Landing page with welcome message
- **Open Source Projects**: Dedicated page for showcasing projects
- **LinkedIn**: External link with icon to LinkedIn profile

## Development

This project is set up with a VS Code devcontainer for consistent development environment.

### Getting Started

1. **Using devcontainer (Recommended):**
   - Open this project in VS Code
   - When prompted, click "Reopen in Container" or use Command Palette: "Dev Containers: Reopen in Container"
   - The container will automatically install dependencies

2. **Local development:**
   ```bash
   npm install
   npm run dev
   ```

#### Using Yarn 4 (recommended)

This repository targets Yarn 4. To use Yarn 4 locally we recommend using Corepack (bundled with modern Node.js). Run the following to enable Yarn 4:

```bash
corepack enable
corepack prepare yarn@4.0.0 --activate
# Use yarn normally after this (e.g. yarn install, yarn dev)
```

If you prefer to pin a specific Yarn 4 release in the repository, add the release file under `.yarn/releases/` and set `yarnPath` in `.yarnrc.yml`.

### Available Scripts

- `yarn dev` - Start development server on port 5173
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Run ESLint with automatic fixes
- `yarn format` - Format code with Prettier
- `yarn format:check` - Check code formatting
- `yarn type-check` - Run TypeScript type checking

### Code Quality Tools

This project uses several tools to maintain code quality:

#### ESLint

- **Purpose**: Catches bugs, enforces coding standards, and maintains code consistency
- **Configuration**: `.eslintrc.cjs`
- **Plugins**: React, React Hooks, JSX A11y (accessibility), Import organization, Prettier integration
- **Key Rules**:
  - Import organization and sorting
  - React best practices (no unused props, proper hooks usage)
  - Accessibility requirements (alt text, ARIA attributes)
  - Code style consistency

#### Prettier

- **Purpose**: Automatic code formatting for consistent style
- **Configuration**: `.prettierrc`
- **Features**:
  - Single quotes, no semicolons
  - 2-space indentation
  - 80 character line width
  - Trailing commas for ES5 compatibility

#### TypeScript

- **Purpose**: Static type checking for better development experience
- **Configuration**: `tsconfig.json` and `tsconfig.node.json`
- **Benefits**: Catch type errors at compile time, better IDE support

#### VS Code Integration

- **Automatic formatting on save**
- **ESLint error highlighting**
- **Auto-fix on save for ESLint rules**
- **Import organization on save**

### CI/CD Pipeline

The project includes GitHub Actions workflow that:

- Runs on push and pull requests to main branch
- Tests against Node.js 20.x
- Installs dependencies with Yarn
- Checks code formatting
- Runs type checking
- Runs ESLint
- Builds the application
- Uploads build artifacts

### Development Environment Features

The devcontainer includes:

- Node.js 18
- Pre-installed VS Code extensions for React/JavaScript development
- Prettier for code formatting
- ESLint for code linting
- Auto port forwarding for development server

### Project Structure

```
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── NavigationBar.jsx
│   │   └── index.js     # Component exports
│   ├── pages/           # Application pages
│   │   ├── Home.jsx
│   │   ├── OpenSourceProjects.jsx
│   │   └── index.js     # Page exports
│   ├── App.jsx          # Main App component with routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── vite.config.js       # Vite configuration with path aliases
└── package.json         # Dependencies and scripts
```

### Path Aliases

The project uses path aliases for cleaner imports:

- `@/` - Points to `src/`
- `@pages/` - Points to `src/pages/`
- `@components/` - Points to `src/components/`

Example:

```javascript
// Instead of
import NavigationBar from '../../../components/NavigationBar'

// Use
import { NavigationBar } from '@/components'
```
