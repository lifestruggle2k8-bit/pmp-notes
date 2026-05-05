# API Documentation - PMP Flashcard System

## Base URL

```
http://localhost:3000/api  (development)
https://api.pmp-flashcards.com/api  (production)
```

## Authentication

All endpoints except `/webhook` require Bearer token authentication:

```
Authorization: Bearer <JWT_TOKEN>
```

## Response Format

All responses are JSON:

```json
{
  "data": {},
  "error": null,
  "timestamp": "2026-05-05T10:30:00Z"
}
```

---

## Cards Endpoints

### List All Cards

```http
GET /api/cards
```

**Response (200 OK)**:
```json
[
  {
    "id": "cuid123",
    "question": "What is a project?",
    "answer": "A temporary endeavor...",
    "chapter": "CH.1",
    "domain": "Domain I",
    "difficulty": "easy",
    "totalReviews": 5,
    "correctCount": 4,
    "nextReviewDate": "2026-05-10T00:00:00Z",
    "interval": 2.5,
    "easeFactor": 2.6,
    "tags": ["definition"],
    "createdAt": "2026-05-01T10:00:00Z",
    "updatedAt": "2026-05-05T10:00:00Z"
  }
]
```

### Get Today's Cards

```http
GET /api/cards/today
```

**Query Parameters**:
- `limit` (optional): Max cards to return (default: 20)

**Response (200 OK)**:
```json
[
  {
    "id": "cuid123",
    "question": "What is...",
    ...
  }
]
```

### Create Card

```http
POST /api/cards
Content-Type: application/json

{
  "question": "What is a constraint?",
  "answer": "A limiting factor...",
  "chapter": "CH.2",
  "domain": "Domain II",
  "difficulty": "medium",
  "tags": ["definition", "constraint"],
  "type": "definition"
}
```

**Response (201 Created)**:
```json
{
  "id": "cuid456",
  "question": "What is a constraint?",
  "answer": "A limiting factor...",
  "chapter": "CH.2",
  "domain": "Domain II",
  "difficulty": "medium",
  "tags": ["definition", "constraint"],
  "type": "definition",
  "totalReviews": 0,
  "correctCount": 0,
  "nextReviewDate": "2026-05-05T00:00:00Z",
  "interval": 1,
  "easeFactor": 2.5,
  "createdAt": "2026-05-05T10:30:00Z",
  "updatedAt": "2026-05-05T10:30:00Z"
}
```

### Update Card

```http
PATCH /api/cards/:id
Content-Type: application/json

{
  "question": "Updated question?",
  "difficulty": "hard",
  "tags": ["new", "tag"]
}
```

**Response (200 OK)**:
```json
{
  "id": "cuid123",
  "question": "Updated question?",
  ...
}
```

### Delete Card

```http
DELETE /api/cards/:id
```

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "Card deleted"
}
```

---

## Review Endpoints

### Submit Review Result

```http
POST /api/review/submit
Content-Type: application/json

{
  "cardId": "cuid123",
  "quality": 2,
  "timeSpent": 15
}
```

**Parameters**:
- `cardId` (required): ID of the card being reviewed
- `quality` (required): Rating 0-3 (0=Again, 1=Hard, 2=Good, 3=Easy)
- `timeSpent` (required): Seconds spent on this card

**Response (200 OK)**:
```json
{
  "review": {
    "id": "review123",
    "cardId": "cuid123",
    "quality": 2,
    "timeSpent": 15,
    "createdAt": "2026-05-05T10:35:00Z"
  },
  "card": {
    "id": "cuid123",
    "totalReviews": 6,
    "correctCount": 5,
    "nextReviewDate": "2026-05-08T00:00:00Z",
    "interval": 3.25,
    "easeFactor": 2.5
  }
}
```

### Get Review History

```http
GET /api/review/history/:cardId
```

**Query Parameters**:
- `limit` (optional): Max records to return (default: 10)

**Response (200 OK)**:
```json
[
  {
    "id": "review123",
    "cardId": "cuid123",
    "quality": 2,
    "timeSpent": 15,
    "createdAt": "2026-05-05T10:35:00Z"
  },
  {
    "id": "review122",
    "cardId": "cuid123",
    "quality": 1,
    "timeSpent": 20,
    "createdAt": "2026-05-04T10:35:00Z"
  }
]
```

---

## Statistics Endpoints

### Get Overall Stats

```http
GET /api/stats
```

**Response (200 OK)**:
```json
{
  "totalCards": 856,
  "masteredCards": 312,
  "learningCards": 284,
  "newCards": 260,
  "overdueCards": 45,
  "totalReviews": 2530,
  "correctReviews": 1907,
  "masteryPercentage": 75,
  "avgTimePerCard": 18,
  "reviewsPerDay": 42,
  "byDomain": {
    "Domain I": {
      "domain": "Domain I",
      "totalCards": 285,
      "masteredCards": 145,
      "masteryPercentage": 51,
      "averageInterval": 4.2
    },
    "Domain II": {
      "domain": "Domain II",
      "totalCards": 286,
      "masteredCards": 98,
      "masteryPercentage": 34,
      "averageInterval": 2.1
    }
  },
  "byChapter": {
    "CH.1": {
      "chapter": "CH.1",
      "totalCards": 42,
      "masteredCards": 28,
      "masteryPercentage": 67
    }
  },
  "trends": [
    {
      "date": "2026-05-01",
      "reviewCount": 25,
      "correctCount": 19,
      "masteryPercentage": 76
    }
  ]
}
```

### Get Stats by Domain

```http
GET /api/stats/domain
```

**Response (200 OK)**:
```json
[
  {
    "domain": "Domain I",
    "totalCards": 285,
    "masteredCards": 145,
    "masteryPercentage": 51,
    "averageInterval": 4.2
  }
]
```

### Get Stats by Chapter

```http
GET /api/stats/chapter
```

**Response (200 OK)**:
```json
[
  {
    "chapter": "CH.1",
    "totalCards": 42,
    "masteredCards": 28,
    "masteryPercentage": 67
  }
]
```

### Get Trends (Last 30 Days)

```http
GET /api/stats/trends
```

**Response (200 OK)**:
```json
[
  {
    "date": "2026-04-05",
    "reviewCount": 0,
    "correctCount": 0,
    "masteryPercentage": 0
  },
  {
    "date": "2026-05-05",
    "reviewCount": 42,
    "correctCount": 32,
    "masteryPercentage": 76
  }
]
```

---

## Webhook Endpoints

### GitHub Push Webhook

```http
POST /webhook/sync/github
X-Hub-Signature-256: sha256=...

{
  "ref": "refs/heads/main",
  "repository": {
    "name": "pmp-cards",
    "owner": {
      "login": "username"
    }
  },
  "commits": [
    {
      "added": [],
      "modified": ["UDEMY CH.1 File.md"],
      "removed": []
    }
  ]
}
```

**Signature Verification**:
```
HMAC-SHA256(webhook_secret, request_body) == header_signature
```

**Response (200 OK)**:
```json
{
  "processed": 1,
  "cardsGenerated": 5
}
```

### Manual Sync Trigger

```http
POST /webhook/sync/manual
Content-Type: application/json

{
  "fileName": "UDEMY CH.1 File.md",
  "userId": "user123"
}
```

**Response (200 OK)**:
```json
{
  "created": 5,
  "updated": 2
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid quality value",
  "details": "quality must be between 0 and 3"
}
```

### 401 Unauthorized
```json
{
  "error": "Missing authorization token"
}
```

### 403 Forbidden
```json
{
  "error": "Invalid token"
}
```

### 404 Not Found
```json
{
  "error": "Card not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "Database connection failed"
}
```

---

## Rate Limiting

- No hard rate limit in development
- Production: 100 requests per minute per user

## Pagination

Some endpoints support pagination:

```http
GET /api/cards?page=1&limit=20
```

## Filtering

Card endpoints support filtering:

```http
GET /api/cards?domain=Domain%20I&difficulty=hard&chapter=CH.1
```

## Sorting

```http
GET /api/cards?sort=nextReviewDate&order=asc
```

## Webhooks

### Registering a Webhook

1. Generate a secure secret
2. Configure GitHub repository webhook
3. Point to: `https://your-domain/webhook/sync/github`
4. Select "Push events"
5. System will verify signature using secret

### Webhook Retry Policy

- 5 retries on failure
- Exponential backoff (1s, 2s, 4s, 8s, 16s)
- Failed webhooks logged for manual review

---

## Types & Interfaces

### Card Type
```typescript
interface Card {
  id: string;
  userId: string;
  question: string;
  answer: string;
  chapter: string;
  domain: string;
  difficulty: 'easy' | 'medium' | 'hard';
  totalReviews: number;
  correctCount: number;
  nextReviewDate: Date;
  interval: number;
  easeFactor: number;
  tags: string[];
  type: 'definition' | 'exam' | 'summary';
  createdAt: Date;
  updatedAt: Date;
}
```

### Review Type
```typescript
interface Review {
  id: string;
  userId: string;
  cardId: string;
  quality: number;
  timeSpent: number;
  createdAt: Date;
}
```

### Stats Type
```typescript
interface StatsResponse {
  totalCards: number;
  masteredCards: number;
  learningCards: number;
  newCards: number;
  overdueCards: number;
  totalReviews: number;
  correctReviews: number;
  masteryPercentage: number;
  avgTimePerCard: number;
  reviewsPerDay: number;
  byDomain: Record<string, DomainStats>;
  byChapter: Record<string, ChapterStats>;
  trends: TrendData[];
}
```

---

## SDK Usage

### JavaScript/TypeScript

```typescript
import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.pmp-flashcards.com/api',
  headers: {
    Authorization: `Bearer ${token}`
  }
});

// Get cards
const response = await client.get('/cards');
const cards = response.data;

// Submit review
await client.post('/review/submit', {
  cardId: 'cuid123',
  quality: 2,
  timeSpent: 15
});

// Get stats
const stats = await client.get('/stats');
```

---

## Testing API

### Using cURL

```bash
# Get cards
curl -H "Authorization: Bearer <token>" \
  https://api.pmp-flashcards.com/api/cards

# Submit review
curl -X POST \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"cardId":"cuid123","quality":2,"timeSpent":15}' \
  https://api.pmp-flashcards.com/api/review/submit
```

### Using Postman

1. Import OpenAPI spec: `https://api.pmp-flashcards.com/openapi.json`
2. Set `Authorization` header with Bearer token
3. Test endpoints from Postman UI

---

**Version**: 1.0.0  
**Last Updated**: 2026-05-05  
**Questions?** Check our [Developer Guide](./DEVELOPER.md)
