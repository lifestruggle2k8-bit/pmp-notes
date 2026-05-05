# PMP Intelligent Flashcard System - Developer Guide

This guide is for developers contributing to the PMP Intelligent Flashcard System project.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Development Setup](#development-setup)
4. [Project Structure](#project-structure)
5. [Core Services](#core-services)
6. [API Documentation](#api-documentation)
7. [Frontend Components](#frontend-components)
8. [Performance Optimization](#performance-optimization)
9. [Testing](#testing)
10. [Deployment](#deployment)

## Project Overview

The PMP Intelligent Flashcard System is a full-stack web application built with React and Node.js that provides:

- Spaced repetition learning using SM-2 algorithm
- Offline-first PWA functionality
- Real-time statistics and analytics
- Automatic card generation from markdown notes
- GitHub webhook integration for auto-sync

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **State Management**: Zustand
- **Data Fetching**: React Query (@tanstack/react-query)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **PWA**: Workbox + Service Workers
- **Storage**: IndexedDB

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Testing**: Jest

### DevOps
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Railway
- **Database**: Railway PostgreSQL
- **CI/CD**: GitHub Actions

## Development Setup

### Prerequisites

- Node.js 16+
- PostgreSQL 13+
- Git
- npm or yarn

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update DATABASE_URL in .env
# DATABASE_URL=postgresql://user:password@localhost:5432/pmp_flashcards

# Setup database
npx prisma migrate dev --name init

# Start development server
npm run dev
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update REACT_APP_API_URL if needed
# REACT_APP_API_URL=http://localhost:3000

# Start development server
npm start
```

### Database Setup

```bash
# Using PostgreSQL CLI
psql -U postgres

# Create database
CREATE DATABASE pmp_flashcards;

# Create user
CREATE USER pmp_user WITH PASSWORD 'your_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE pmp_flashcards TO pmp_user;
```

## Project Structure

### Backend Structure

```
backend/
├── src/
│   ├── index.ts                    # Express app entry
│   ├── config/
│   │   └── database.ts             # Prisma client setup
│   ├── middleware/
│   │   └── auth.ts                 # JWT auth middleware
│   ├── routes/
│   │   ├── cards.ts                # Card endpoints
│   │   ├── review.ts               # Review endpoints
│   │   ├── stats.ts                # Stats endpoints
│   │   └── sync.ts                 # GitHub webhook
│   ├── services/
│   │   ├── cardGenerator.ts        # Card generation logic
│   │   ├── reviewEngine.ts         # Spaced repetition algorithm
│   │   ├── statsCalculator.ts      # Statistics calculation
│   │   └── githubSync.ts           # GitHub integration
│   └── types/
│       └── index.ts                # TypeScript interfaces
├── prisma/
│   ├── schema.prisma               # Database schema
│   └── migrations/                 # DB migrations
└── tests/
    ├── unit/
    └── integration/
```

### Frontend Structure

```
frontend/
├── src/
│   ├── index.tsx
│   ├── App.tsx                     # Main app component
│   ├── components/
│   │   ├── Card.tsx                # Card flip component
│   │   ├── StatsChart.tsx          # Chart components
│   │   ├── CardEditor.tsx          # Card editor
│   │   └── OptimizedCard.tsx       # Optimized card (memoized)
│   ├── pages/
│   │   ├── index.tsx               # Home page
│   │   ├── review.tsx              # Review page
│   │   ├── stats.tsx               # Statistics page
│   │   ├── cards.tsx               # Card management
│   │   └── settings.tsx            # Settings page
│   ├── hooks/
│   │   ├── useCards.ts             # Card hooks
│   │   └── useStats.ts             # Stats hooks
│   ├── store/
│   │   └── cardStore.ts            # Zustand store
│   ├── api/
│   │   └── client.ts               # Axios client
│   ├── utils/
│   │   ├── offlineStorage.ts       # IndexedDB utilities
│   │   └── performance.ts          # Performance utilities
│   └── types/
│       └── index.ts                # TypeScript types
├── public/
│   ├── index.html
│   ├── manifest.json               # PWA manifest
│   ├── service-worker.ts           # Service Worker
│   └── offline.html                # Offline fallback
└── tests/
    ├── components/
    └── hooks/
```

## Core Services

### CardGenerator Service

Parses markdown files and generates flashcards:

```typescript
import { generateCardsFromMarkdown } from '../services/cardGenerator';

const result = await generateCardsFromMarkdown(
  userId,
  fileName,
  markdownContent,
  chapter,
  domain
);
// Returns: { created: number, updated: number }
```

### ReviewEngine Service

Implements SM-2 spaced repetition algorithm:

```typescript
import { calculateNextInterval, getNextReviewDate } from '../services/reviewEngine';

const { interval, factor } = calculateNextInterval(
  previousInterval,
  previousFactor,
  quality  // 0-3
);

const nextReviewDate = getNextReviewDate(interval);
```

### StatsCalculator Service

Calculates comprehensive statistics:

```typescript
import { calculateUserStats } from '../services/statsCalculator';

const stats = await calculateUserStats(userId);
// Returns: StatsResponse with detailed breakdown
```

## API Documentation

### Authentication

All protected endpoints require JWT token in Authorization header:

```bash
Authorization: Bearer <token>
```

### Card Endpoints

```
GET    /api/cards                # List all cards
GET    /api/cards/today          # Get today's cards
POST   /api/cards                # Create card
PATCH  /api/cards/:id            # Update card
DELETE /api/cards/:id            # Delete card
```

### Review Endpoints

```
POST   /api/review/submit        # Submit review result
GET    /api/review/history/:id   # Get card history
```

### Stats Endpoints

```
GET    /api/stats                # Get overall stats
GET    /api/stats/domain         # Get stats by domain
GET    /api/stats/chapter        # Get stats by chapter
GET    /api/stats/trends         # Get trend data
```

### Webhook Endpoints

```
POST   /webhook/sync/github      # GitHub webhook (no auth)
POST   /webhook/sync/manual      # Manual sync trigger
```

## Frontend Components

### Card Component

Base card component for displaying and rating:

```tsx
<Card
  card={cardData}
  onRate={(quality) => handleRating(quality)}
  isLoading={false}
/>
```

### OptimizedCard Component

Memoized version with performance optimizations:

```tsx
<OptimizedCard
  card={cardData}
  onRate={handleRating}
  isLoading={isLoading}
/>
```

### Hooks

```tsx
// Load user's cards
const { cards, isLoading, error, refetch } = useCards();

// Load today's review cards
const { cards, isLoading } = useTodayCards();

// Submit review result
const submitReview = useSubmitReview();

// Load statistics
const { stats, isLoading } = useStats();
const { stats: domainStats } = useStatsByDomain();
const { trends } = useTrends();
```

## Performance Optimization

### Memoization

```tsx
// Component memoization
export const MyComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});

// Hook memoization
const value = useMemo(() => expensiveCalculation(), [dep]);
const callback = useCallback(() => action(), [dep]);
```

### Code Splitting

```tsx
const StatsPage = lazy(() => import('./pages/stats'));

// In router
<Suspense fallback={<Loading />}>
  <Route path="/stats" element={<StatsPage />} />
</Suspense>
```

### Lazy Loading Images

```tsx
<img data-src="image.jpg" alt="description" />

// Activate in util
import { setupImageLazyLoading } from '../utils/performance';
setupImageLazyLoading();
```

### Caching Strategies

**API Response Caching**:
```tsx
useQuery('stats', fetchStats, {
  staleTime: 1000 * 60 * 5,      // 5 minutes
  cacheTime: 1000 * 60 * 30,     // 30 minutes
  refetchInterval: 1000 * 60 * 10 // 10 minutes
});
```

## Testing

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Unit Tests Example

```typescript
describe('ReviewEngine', () => {
  it('should calculate correct interval for correct answer', () => {
    const result = calculateNextInterval(1, 2.5, 3);
    expect(result.interval).toBe(2.5);
  });
});
```

### Integration Tests

```typescript
describe('Cards API', () => {
  it('should create a new card', async () => {
    const response = await request(app)
      .post('/api/cards')
      .set('Authorization', `Bearer ${token}`)
      .send(cardData);
    
    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
  });
});
```

## Deployment

### Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

### Backend (Railway)

1. Push code to GitHub
2. Connect repository to Railway
3. Set environment variables
4. Auto-deploys on push

### Environment Variables

**Backend (.env)**:
```
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret
GITHUB_TOKEN=ghp_...
GITHUB_WEBHOOK_SECRET=your_secret
PORT=3000
NODE_ENV=production
```

**Frontend (.env)**:
```
REACT_APP_API_URL=https://api.pmp-flashcards.com
REACT_APP_GITHUB_REPO=username/repo
```

### Database Migrations

```bash
# Create migration
npx prisma migrate dev --name feature_name

# Apply migrations (production)
npx prisma migrate deploy
```

## Monitoring

### Error Tracking

- Sentry integration for error monitoring
- Performance monitoring via Web Vitals
- Custom logging setup

### Analytics

- Google Analytics for user tracking
- Custom events for feature usage
- Performance metrics

## Contributing

1. Create feature branch: `git checkout -b feature/name`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/name`
4. Open Pull Request
5. Tests must pass before merge

## Code Style

- Use TypeScript strictly
- ESLint + Prettier for formatting
- Follow React best practices
- Comment complex logic
- Add tests for new features

## Resources

- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)

---

**Version**: 1.0.0  
**Last Updated**: 2026-05-05
