# Auto Insurance POC — GAINSCO

This is a Next.js project built as a Proof of Concept for GAINSCO Auto Insurance.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** .NET Core API
- **Authentication:** Microsoft Entra External ID (Azure AD B2C)
- **Deployment:** Azure App Services
- **PWA:** next-pwa

## Features

- Multi-step quote form (Location → Vehicle → Driver → History)
- Final quote result with Annual Premium
- MVR & CLUE verification chips
- PWA support
- Azure authentication (in progress)

## Project Structure

```
src/
├── app/
│   ├── api/          # API routes
│   ├── components/   # Reusable components
│   ├── hooks/        # Custom hooks
│   └── lib/          # Utility functions
```

## Environment Variables

Create a `.env.local` file in root:

```
NEXT_PUBLIC_BACKEND_URL=your_backend_url
```

## Deployment

Deployed on **Azure App Services** — Central India region.
