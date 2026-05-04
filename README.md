# PMP Intelligent Flashcard System

A cross-platform intelligent flashcard learning system for PMP (Project Management Professional) certification preparation with spaced-repetition algorithms, GitHub auto-sync, and real-time statistics.

## Project Structure

```
.
├── backend/                 # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── index.ts        # Express server entry point
│   │   ├── config/         # Configuration files
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # Data models
│   │   └── types/          # TypeScript type definitions
│   ├── tests/              # Unit & integration tests
│   ├── prisma/             # Database schema & migrations
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/               # React 18 + TypeScript
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── store/          # Zustand state management
│   │   ├── api/            # API client
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Utility functions
│   │   ├── App.tsx         # Root component
│   │   └── index.tsx       # Entry point
│   ├── public/             # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── .env.example
│
├── .github/
│   └── workflows/          # GitHub Actions CI/CD
│
├── .gitignore
└── README.md
```

## Tech Stack

**Backend:**
- Node.js + Express
- TypeScript
- PostgreSQL + Prisma ORM
- JWT Authentication
- Jest for testing

**Frontend:**
- React 18
- TypeScript
- React Router v6
- Zustand (state management)
- React Query (data fetching)
- Tailwind CSS
- Workbox (PWA support)

**Infrastructure:**
- Vercel (Frontend deployment)
- Railway (Backend deployment)
- PostgreSQL (Database)
- GitHub Actions (CI/CD)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL 12+
- Git

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Configure environment variables in `.env`

5. Set up the database and run migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file from `.env.example`:
   ```bash
   cp .env.example .env.local
   ```

4. Configure `REACT_APP_API_URL` to point to your backend

5. Start the development server:
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000` (React dev server may use port 3001)

## API Endpoints

### Health Check
- `GET /health` - System health status

### Cards
- `GET /api/cards` - Get all cards (authenticated)
- `GET /api/cards/today` - Get today's review cards
- `POST /api/cards` - Create a new card
- `PUT /api/cards/:id` - Update a card
- `DELETE /api/cards/:id` - Delete a card

### Review
- `POST /api/review/submit` - Submit a review result
- `GET /api/review/history/:cardId` - Get review history for a card

### Statistics
- `GET /api/stats` - Get learning statistics (coming soon)

### Webhooks
- `POST /webhook/sync` - GitHub webhook for auto-sync
- `POST /webhook/manual` - Manual sync endpoint

## Features

### MVP (Week 1)
- ✅ Flashcard creation and management
- ✅ Spaced repetition learning algorithm
- ✅ Review session tracking
- ✅ Basic statistics dashboard
- ✅ GitHub auto-sync for card generation
- ✅ Responsive UI

### Planned (Week 2+)
- PWA offline support
- Advanced statistics and charts
- Card editor with rich formatting
- User settings and preferences
- Performance optimizations
- Mobile-optimized interface

## Development Commands

### Backend
```bash
cd backend

# Development
npm run dev

# Build
npm run build

# Tests
npm test

# Database
npx prisma migrate dev       # Run migrations
npx prisma studio          # Open Prisma Studio GUI
npx prisma generate        # Generate Prisma client
```

### Frontend
```bash
cd frontend

# Development
npm start

# Build
npm run build

# Tests
npm test

# Eject (one-way operation)
npm run eject
```

## Environment Variables

### Backend (.env)
```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/pmp_flashcards
JWT_SECRET=your_secret_key
GITHUB_TOKEN=your_github_token
GITHUB_REPO=your_username/repo
GITHUB_WEBHOOK_SECRET=webhook_secret
```

### Frontend (.env.local)
```env
REACT_APP_API_URL=http://localhost:3000
REACT_APP_GITHUB_REPO=your_username/pmp-cards
```

## Testing

### Unit Tests
```bash
cd backend
npm test -- --testPathPattern=cardGenerator
```

### Integration Tests
```bash
cd backend
npm test -- --testPathPattern=api
```

## Deployment

### Vercel (Frontend)
```bash
vercel deploy
```

### Railway (Backend)
1. Create Railway account
2. Connect GitHub repository
3. Set environment variables
4. Deploy automatically

## Git Workflow

```bash
# Create a feature branch
git checkout -b feature/task-name

# Make changes and commit
git add .
git commit -m "feat: describe changes"

# Push to remote
git push origin feature/task-name

# Create pull request on GitHub
```

## Contributing

1. Create a feature branch from `main`
2. Make changes following TypeScript strict mode
3. Ensure tests pass
4. Commit with clear messages
5. Push and create a pull request

## License

MIT

## Project Status

**Current Phase:** Week 1 - MVP Development
**Last Updated:** May 4, 2026

### Week 1 Milestones
- [x] Task 1: Project initialization and environment setup
- [ ] Task 2: Database setup with Prisma
- [ ] Task 3: Backend authentication and API framework
- [ ] Task 4: Card generation engine
- [ ] Task 5: Frontend basic pages
- [ ] Task 6: Cards API endpoints
- [ ] Task 7: Review recording and algorithm
- [ ] Task 8: GitHub webhook sync
- [ ] Task 9: Frontend API client and state management
- [ ] Task 10: MVP deployment and testing

## Support

For issues and questions, please refer to the implementation plan in `docs/superpowers/plans/`.
