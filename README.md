# Personal Portfolio & Resume Website

A modern, interactive portfolio and resume website built with React, TypeScript, and Tailwind CSS. Features a responsive design, dark/light theme support, interactive sections, and Supabase integration for additional functionality.

## Features

- **Responsive Design**: Fully responsive layout adapting to all screen sizes
- **Dark/Light Theme**: Toggle between dark and light modes
- **Interactive Sections**:
  - Hero section with particle background
  - About & Education
  - Experience & Projects
  - Achievements & Skills
  - Gallery (Personal & Project)
  - Reports & Resume viewer
  - Interactive Terminal Section
  - Integrated Chatbot
- **Advanced Components**:
  - PDF viewer modal for documents
  - GoMix code editor integration
  - EmailJS integration for contact forms
  - Google reCAPTCHA integration
  - Supabase backend support
- **UI Components**: Complete set of shadcn/ui components
- **Code Quality**: ESLint configured for code standards

## Technology Stack

- **Frontend Framework**: React 19+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + PostCSS
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **Code Editor**: CodeMirror
- **Backend**: Supabase (PostgreSQL)
- **Package Manager**: Bun
- **Linting**: ESLint

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- npm or Bun package manager
- Git

## Getting Started

### Installation

1. **Clone the repository**
   ```sh
   git clone <YOUR_GIT_URL>
   cd webapp
   ```

2. **Install dependencies**
   ```sh
   npm install
   # or with Bun
   bun install
   ```

3. **Environment Setup**
   - Configure your Supabase credentials (if needed)
   - Set up Google reCAPTCHA keys
   - Configure EmailJS credentials

## Available Scripts

### Development

Start the development server with hot module reloading:
```sh
npm run dev
# or with Bun
bun run dev
```

The application will be available at `http://localhost:5173`

### Build

Create an optimized production build:
```sh
npm run build
# or with Bun
bun run build
```

Build output will be in the `dist/` directory.

### Development Build

Build with development mode enabled:
```sh
npm run build:dev
```

### Preview

Preview the production build locally:
```sh
npm run preview
```

### Linting

Run ESLint to check code quality:
```sh
npm run lint
```

## Project Structure

```
webapp/
├── src/
│   ├── components/          # React components
│   │   ├── sections/        # Page sections
│   │   ├── ui/              # shadcn-ui components
│   │   └── ...
│   ├── pages/               # Page routes
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── integrations/        # External service integrations
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
│   ├── files/               # Document files
│   ├── reports/             # Report files
│   └── resume/              # Resume files
├── supabase/                # Supabase configuration
├── vite.config.ts           # Vite configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## Configuration

### Tailwind CSS
Configured in `tailwind.config.ts` with custom theme extensions.

### TypeScript
Configuration files:
- `tsconfig.json` - Main TypeScript config
- `tsconfig.app.json` - React app specific config
- `tsconfig.node.json` - Node.js related config

### Vite
Development server and build configuration in `vite.config.ts`.

## Deployment

### Build for Production

```sh
npm run build
```

The build output is optimized and ready for deployment to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

### Environment Variables

Create a `.env.local` file with your configuration:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_key
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
```

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## Development Workflow

### Code Quality
- Run linting before committing: `npm run lint`
- Fix linting issues: `npm run lint -- --fix`
- Build and test locally before pushing

### Performance Tips
- Use the preview command to test production builds locally
- Monitor bundle size with Vite's built-in reporting
- Lazy load components where appropriate

## Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically try the next available port.

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`
- Ensure Node.js version matches requirements

### Module Resolution Issues
- Check `tsconfig.json` path aliases
- Verify import paths use correct case sensitivity

## License

This project is private. All rights reserved.

## Contact

For questions or inquiries about this project, please reach out through the contact section on the website.
