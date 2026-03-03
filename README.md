# AptIQ – Learn. Test. Rank. 📒

A free, open-source, notebook-style aptitude learning & testing platform for Indian college students.

## ✨ Features

- **Notebook UI** – Cream backgrounds, ruled lines, spiral binding, sticky-note cards, highlighter effects
- **Learning Paths** – Structured chapters for Quantitative, Logical, Verbal, and Data Interpretation
- **Timed Tests** – Anti-cheat enabled (tab-switch detection, right-click disabled), countdown timer
- **Live Leaderboard** – Ranked table with real-time updates (Socket.io ready)
- **Analytics Dashboard** – Section-wise accuracy bar chart, time-per-question line chart, weak areas
- **Badges & Streaks** – Achievement system with daily streak tracking

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🛠 Tech Stack

- **React 19** + **Vite 7** – Fast development & HMR
- **Tailwind CSS 4** – Utility-first styling (no custom CSS)
- **React Router** – Client-side routing
- **Chart.js** + **react-chartjs-2** – Analytics charts
- **Lucide Icons** – Static SVG icons via CDN
- **Google Fonts** – Inter, Caveat, Patrick Hand

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx        # Top navigation bar
│   └── Sidebar.jsx       # Left sidebar with spiral binding
├── data/
│   ├── badges.js         # Badge & streak data
│   ├── leaderboard.js    # Leaderboard entries
│   ├── lessons.js        # Learning paths & chapters
│   └── questions.js      # Test questions
├── pages/
│   ├── Analytics.jsx     # Charts & weak areas
│   ├── AuthForm.jsx      # Sign-in / Sign-up
│   ├── BadgeStreak.jsx   # Badges grid & streak counter
│   ├── Dashboard.jsx     # Main dashboard with cards
│   ├── LandingPage.jsx   # Hero & features
│   ├── Leaderboard.jsx   # Ranked table
│   ├── LearningPath.jsx  # Chapter list & lessons
│   └── TestEngine.jsx    # Full-screen test mode
├── App.jsx               # Router & layout
├── main.jsx              # Entry point
└── index.css             # Tailwind + notebook utilities
```

## 🎨 Design Tokens (Figma Variables)

| Token     | Color     |
|-----------|-----------|
| Navy      | `#1a3a5c` |
| Cream     | `#faf8f2` |
| Yellow    | `#fff176` |
| Green     | `#b9f6ca` |
| Pink      | `#f8bbd9` |
| Blue      | `#b3e5fc` |

## 🔜 Next Steps (Backend Integration)

### JWT Authentication
- `POST /api/auth/register` – Register with email, password, role
- `POST /api/auth/login` – Login, returns JWT token
- `GET /api/auth/me` – Get current user (requires Bearer token)
- Wrap app with `AuthContext` provider, store token in `localStorage`

### Socket.io Real-time Events
- `leaderboard:update` – Broadcasts new leaderboard data
- `test:submit` – Emits test results to server
- `user:streak` – Real-time streak updates
- Connect in `useEffect` with cleanup on unmount

### Database Models
- `User` – id, email, password_hash, role, created_at
- `Test` – id, title, duration, section, questions (JSON)
- `TestResult` – id, user_id, test_id, score, answers, time_taken
- `Badge` – id, name, icon, criteria
- `UserBadge` – user_id, badge_id, earned_at

### API Endpoints
- `GET /api/lessons` – Fetch learning paths
- `GET /api/tests` – List available tests
- `POST /api/tests/:id/submit` – Submit test answers
- `GET /api/leaderboard` – Fetch rankings
- `GET /api/analytics/me` – Fetch user analytics

## 📄 License

MIT – Free and open source. Made with ❤️ for Indian students.
