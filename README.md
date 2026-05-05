# PMP Intelligent Flashcard System

A cross-platform intelligent spaced repetition learning system with GitHub auto-sync, advanced analytics, offline support, and PWA capabilities.

## Status: Complete (All 16 Tasks Implemented)

✅ **MVP Features** (Week 1)
✅ **Advanced Features** (Week 2)  
✅ **Production Ready**

## Core Features

### Learning System
- Interactive flashcard review with flip animation
- SM-2 spaced repetition algorithm
- Daily review goals and progress tracking
- Support for 4-level rating (Again, Hard, Good, Easy)
- Automatic card generation from markdown notes

### Content Management
- Create, edit, delete flashcards
- Bulk operations and card management
- Search and filter cards by domain/chapter/difficulty
- Tag-based organization
- Support for multiple content types

### Statistics & Analytics
- Comprehensive dashboard with key metrics
- Domain and chapter-wise breakdown
- 30-day learning trends
- Accuracy tracking and performance metrics
- Exportable data for personal tracking

### Offline & PWA
- Full offline support with Service Worker
- IndexedDB caching for cards and progress
- Automatic sync when back online
- Installable as web app on devices
- Background sync for offline reviews

### Advanced Features
- Customizable settings (daily goals, review mode, theme)
- GitHub webhook integration for auto-sync
- API-first architecture
- Performance optimizations (memoization, code splitting)
- Error reporting and analytics

## Documentation

Complete documentation is provided in multiple formats:

| Document | Purpose |
|----------|---------|
| [USER_GUIDE.md](./USER_GUIDE.md) | For end users - how to use the system |
| [DEVELOPER.md](./DEVELOPER.md) | For developers - architecture and development |
| [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) | Complete API reference |
| [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) | Common issues and solutions |

## Quick Start

### Backend

```bash
cd backend
npm install
cp .env.example .env

# Update .env with your database URL
npx prisma migrate dev

# Start development server
npm run dev
```

Backend runs at `http://localhost:3000`

### Frontend

```bash
cd frontend
npm install
cp .env.example .env

# Update .env with API URL if needed
npm start
```

Frontend runs at `http://localhost:3000`

## Project Structure

```
.
├── backend/                     # Node.js/Express API
│   ├── src/
│   │   ├── routes/             # API endpoints
│   │   ├── services/           # Business logic
│   │   ├── middleware/         # Middleware (auth, etc)
│   │   └── types/              # TypeScript definitions
│   ├── prisma/
│   │   └── schema.prisma       # Database schema
│   └── tests/                  # Unit & integration tests
│
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── pages/              # Page components
│   │   ├── hooks/              # Custom hooks
│   │   ├── api/                # API client
│   │   ├── store/              # Zustand state
│   │   └── utils/              # Utilities
│   ├── public/
│   │   ├── service-worker.ts   # PWA service worker
│   │   ├── manifest.json       # PWA manifest
│   │   └── offline.html        # Offline fallback
│   └── tests/                  # Component tests
│
├── USER_GUIDE.md               # User documentation
├── DEVELOPER.md                # Developer guide
├── API_DOCUMENTATION.md        # API reference
└── TROUBLESHOOTING.md          # Troubleshooting guide
```

## Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | React 18, TypeScript, Tailwind CSS |
| **State** | Zustand, React Query |
| **Backend** | Node.js, Express, TypeScript |
| **Database** | PostgreSQL, Prisma ORM |
| **Auth** | JWT tokens |
| **PWA** | Service Workers, IndexedDB, Workbox |
| **Deployment** | Vercel (frontend), Railway (backend) |

## API Overview

### Key Endpoints

```
# Cards
GET    /api/cards              # List all cards
GET    /api/cards/today        # Get today's cards
POST   /api/cards              # Create card
PATCH  /api/cards/:id          # Update card
DELETE /api/cards/:id          # Delete card

# Reviews
POST   /api/review/submit      # Submit review
GET    /api/review/history/:id # Get history

# Statistics
GET    /api/stats              # Overall stats
GET    /api/stats/domain       # Stats by domain
GET    /api/stats/chapter      # Stats by chapter
GET    /api/stats/trends       # Learning trends

# Webhooks
POST   /webhook/sync/github    # GitHub webhook
POST   /webhook/sync/manual    # Manual sync
```

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete reference.

## Environment Variables

### Backend (.env)

```env
DATABASE_URL=postgresql://user:password@localhost:5432/pmp_flashcards
JWT_SECRET=your_secret_key
GITHUB_TOKEN=your_github_token
GITHUB_REPO=username/repo
GITHUB_WEBHOOK_SECRET=your_webhook_secret
PORT=3000
NODE_ENV=development
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:3000
```

## Features by Task

### Task 11: Statistics Dashboard
- Real-time statistics calculation
- Domain and chapter breakdown
- 30-day trend analysis
- Custom chart components
- API endpoints for metrics

### Task 12: PWA Offline Support
- Service Worker implementation
- IndexedDB storage
- Offline card caching
- Automatic sync on reconnect
- Installable web app

### Task 13: Card Editor & Management
- Create/edit/delete cards
- Bulk operations
- Search and filtering
- Tag management
- Difficulty classification

### Task 14: Settings & Preferences
- Daily goal configuration
- Review mode selection
- Theme preferences
- Feature toggles
- Data export/import

### Task 15: Performance Optimization
- React.memo component optimization
- useCallback/useMemo hooks
- Lazy loading and code splitting
- API response caching
- Image lazy loading

### Task 16: Documentation
- User guide with tutorials
- Developer guide with setup
- Complete API documentation
- Troubleshooting guide
- Code examples and best practices

## Key Features Explained

### Spaced Repetition (SM-2)
The system implements the Supermemo 2 algorithm:
- Easy cards (quality=3): interval increases 2.5x
- Good cards (quality=2): interval increases 1.3x
- Hard cards (quality=1): interval increases 1.1x
- Failed cards (quality=0): resets to 1 day

### Offline-First Architecture
- Cards cached locally with Service Worker
- Reviews recorded in IndexedDB
- Automatic sync when online
- No data loss in offline mode

### Responsive Design
- Works on desktop, tablet, mobile
- Progressive Web App features
- Touch-optimized interface
- Dark/light theme support

## Performance Metrics

Target Web Vitals:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

Optimizations:
- Component memoization
- API response caching
- Code splitting by route
- Image lazy loading
- Debounced/throttled events

## Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## Deployment

### Frontend (Vercel)
```bash
npm install -g vercel
cd frontend
vercel
```

### Backend (Railway)
1. Connect GitHub repository to Railway
2. Set environment variables
3. Auto-deploys on push to main

See [DEVELOPER.md](./DEVELOPER.md) for detailed deployment steps.

## Support & Help

- **User Help**: See [USER_GUIDE.md](./USER_GUIDE.md)
- **Development**: See [DEVELOPER.md](./DEVELOPER.md)
- **API Reference**: See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Troubleshooting**: See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Issues**: Report on GitHub issues
- **Email**: support@pmp-flashcards.com

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## Performance Optimization Tips

For users:
- Review daily at same time
- Focus on overdue cards first
- Rate honestly for algorithm accuracy
- Use offline mode during commute
- Export data regularly for backup

For developers:
- Use React.memo for pure components
- Implement useCallback for event handlers
- Cache API responses appropriately
- Lazy load images and heavy components
- Monitor Web Vitals with DevTools

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - See LICENSE file for details

## Version History

- **v1.0.0** (2026-05-05) - Complete implementation with all 16 tasks
  - Full-stack application complete
  - All features implemented
  - Production-ready code
  - Comprehensive documentation

---

**Last Updated**: 2026-05-05  
**Status**: Production Ready  
**Maintainer**: PMP Flashcard Team

For more information, see the documentation files linked above.

