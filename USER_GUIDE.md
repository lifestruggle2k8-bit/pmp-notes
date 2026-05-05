# PMP Intelligent Flashcard System - User Guide

Welcome to the PMP Intelligent Flashcard System! This guide will help you get started with spaced repetition learning for your PMP exam preparation.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Core Features](#core-features)
3. [Review Sessions](#review-sessions)
4. [Statistics & Analytics](#statistics--analytics)
5. [Offline Learning](#offline-learning)
6. [Settings & Preferences](#settings--preferences)
7. [Keyboard Shortcuts](#keyboard-shortcuts)
8. [FAQ](#faq)

## Getting Started

### Creating Your Account

1. Navigate to the application homepage
2. Click "Sign Up" or use OAuth authentication
3. Set your initial preferences
4. You're ready to start!

### First Review Session

1. Click "Start Review" on the homepage
2. You'll see your first flashcard with a question
3. Click the card to reveal the answer
4. Rate your performance (0-3 scale)
5. Move to the next card

## Core Features

### 1. Flashcard Management

#### Creating Cards

- Click "Manage Cards" from the main menu
- Click "+ New Card"
- Fill in the question and answer
- Set difficulty level (Easy/Medium/Hard)
- Add tags for organization
- Click "Create Card"

#### Editing Cards

1. Go to "Manage Cards"
2. Find the card you want to edit
3. Click the "Edit" button
4. Modify the content
5. Click "Update Card"

#### Deleting Cards

- Click the "Delete" button next to any card
- Confirm the deletion
- The card will be removed permanently

### 2. Review Sessions

#### Starting a Review

1. Click "Start Review"
2. You'll see cards that need review
3. Review process:
   - Read the question carefully
   - Think about the answer
   - Click the card to reveal the answer
   - Rate your answer (0-3)
   - Move to next card

#### Rating Scale

- **0 (Again)**: You didn't know the answer - card will reappear soon
- **1 (Hard)**: You struggled with the answer - will appear more frequently
- **2 (Good)**: You knew the answer with some effort - normal interval
- **3 (Easy)**: You answered correctly and easily - interval extends

#### Daily Goals

- Set your daily review goal in Settings
- The system will show you how many cards to review today
- Your progress bar tracks completion

### 3. Statistics & Analytics

#### Dashboard Metrics

- **Total Cards**: Overall number of flashcards
- **Mastered Cards**: Cards you consistently get right
- **Learning Cards**: Cards currently in your learning curve
- **Overdue Cards**: Cards that need immediate review
- **Review Accuracy**: Your overall accuracy percentage

#### Trends

- View your learning progress over the last 30 days
- Monitor mastery percentage improvements
- Track your daily review consistency

#### By Domain/Chapter

- See which domains/chapters you excel in
- Identify areas needing more focus
- Compare performance across topics

### 4. Offline Learning

#### Enabling Offline Mode

1. Go to Settings
2. Click "Enable Offline Mode"
3. Cards will automatically cache for offline use
4. You can now review without internet

#### Offline Review

- Offline mode works just like online review
- Your progress is saved locally
- Changes sync automatically when back online

#### Clearing Cache

- Go to Settings > Offline Storage
- Click "Clear Cache"
- This frees up storage space

### 5. Settings & Preferences

#### Learning Preferences

- **Daily Goal**: Set how many cards to review daily (5-100)
- **Review Mode**: Choose how cards are ordered:
  - Overdue First: Prioritize cards needing review
  - New Cards First: Focus on learning new material
  - All Mixed: Random order

#### Feature Toggles

- **Push Notifications**: Reminders about daily reviews
- **Offline Mode**: Enable offline functionality
- **Analytics**: Help improve the app

#### Theme Settings

- Light mode
- Dark mode
- Auto (follows system settings)

#### Data Management

- **Export Data**: Download your cards and progress
- **Import Data**: Restore from a backup
- **Clear Cache**: Remove offline data

## Review Sessions

### Optimal Review Strategy

1. **Daily Consistency**: Review at the same time each day
2. **Complete Sessions**: Try to finish all daily cards
3. **Focus**: Minimize distractions during reviews
4. **Honest Rating**: Rate yourself accurately for algorithm accuracy
5. **Progressive Learning**: Gradually increase daily goals

### Understanding the Algorithm

The system uses a spaced repetition algorithm (SM-2) that:

- Increases intervals for cards you know well
- Decreases intervals for difficult cards
- Balances new and review cards optimally
- Adjusts based on your accuracy

### Tips for Better Learning

- Review in quiet, focused environment
- Don't rush through cards
- Try to recall before flipping
- Rate yourself honestly
- Review same time daily for habit building
- Focus on problem cards

## Statistics & Analytics

### Key Metrics Explained

- **Mastery Percentage**: (Mastered Cards / Total Cards) × 100
- **Review Accuracy**: (Correct Answers / Total Reviews) × 100
- **Average Interval**: Days between reviews (higher = better)

### Using Analytics

1. **Identify Weak Areas**: Check "By Domain" stats
2. **Track Progress**: Monitor trends over time
3. **Plan Focus**: Allocate more time to weak chapters
4. **Measure Success**: Watch accuracy improve

### Exporting Reports

1. Go to Settings
2. Click "Export Data"
3. Save the JSON file
4. Use for personal tracking or sharing

## Offline Learning

### How It Works

- Service Worker caches essential data
- IndexedDB stores cards and progress
- Review results sync when online
- No data loss in offline mode

### Requirements

- Modern browser (Chrome, Firefox, Safari, Edge)
- Local storage available (~10MB)
- Service Worker support

### Limitations

- Large media attachments may not cache
- Real-time features unavailable offline
- Sync happens when internet returns

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Space | Flip card |
| 0 | Rate: Again |
| 1 | Rate: Hard |
| 2 | Rate: Good |
| 3 | Rate: Easy |
| N | Next card |
| P | Previous card (review mode) |
| / | Search/focus search |
| Esc | Close modal |

## FAQ

### Q: How often should I review?

**A**: Ideally daily, at the same time. The system will adjust card intervals based on your performance. Even 10-15 minutes daily is better than sporadic long sessions.

### Q: What if I get a card wrong?

**A**: Rate it as "Again" (0). The card will reappear sooner. This helps identify gaps in knowledge.

### Q: Can I study offline?

**A**: Yes! Enable offline mode in Settings. All cards previously loaded will work offline, and progress syncs when back online.

### Q: How do I export my data?

**A**: Go to Settings > Data Management > Export Data. Your cards and progress save as JSON.

### Q: Why are some cards appearing more frequently?

**A**: The spaced repetition algorithm shows cards based on difficulty and your accuracy. Harder cards appear more often.

### Q: Can I sync across devices?

**A**: Cards are stored per account. Log in on any device to access the same data. However, local cache must be populated separately on each device.

### Q: What's the best accuracy score?

**A**: Aim for 75-85% overall accuracy. Higher suggests cards are too easy; lower suggests material is too difficult.

### Q: How long until I master all cards?

**A**: Depends on:
- Number of cards
- Daily review consistency
- Card difficulty
- Your prior knowledge

Average: 3-6 months for 800-900 cards with daily 20-30 minute sessions.

### Q: Can I schedule reviews for later?

**A**: Cards are shown based on due date. Simply don't review early cards - they'll be ready when the interval expires.

### Q: How do I backup my progress?

**A**: Use Export Data regularly. Store the JSON file safely. You can restore using Import Data.

## Troubleshooting

### Cards not syncing offline

1. Check internet connection
2. Go to Settings > Offline Storage
3. Click "Enable Offline Mode"
4. Refresh the page
5. Cards should populate

### Service Worker not working

1. Use a modern browser
2. Ensure HTTPS is enabled (or localhost for development)
3. Clear browser cache
4. Re-register Service Worker in Settings

### Lost progress after clearing cache

- This is why regular exports are important!
- Use Import Data to restore from backup
- Contact support with export file

### Slow performance

1. Clear offline cache in Settings
2. Export and backup data
3. Delete unnecessary cards
4. Try different browser or device

## Getting Help

- Check FAQ section above
- Review this guide
- Contact support: support@pmp-flashcards.com
- Report bugs: github.com/pmp-flashcards/issues

## Best Practices

### Daily Routine

1. Check statistics dashboard
2. Complete daily review goal
3. Focus on overdue cards first
4. Check progress on weak areas

### Weekly Review

1. Check weekly trends
2. Identify improving areas
3. Assess overall progress
4. Adjust settings if needed

### Monthly Goals

1. Export and backup data
2. Review overall mastery %
3. Plan focus areas
4. Adjust daily goals if needed

---

**Version**: 1.0.0  
**Last Updated**: 2026-05-05  
**Questions?** Contact support or check our FAQ.
