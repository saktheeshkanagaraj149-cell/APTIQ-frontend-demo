import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import AuthForm from './pages/AuthForm';
import Dashboard from './pages/Dashboard';
import LearningPath from './pages/LearningPath';
import Test from './pages/Test';
import Leaderboard from './pages/Leaderboard';
import Analytics from './pages/Analytics';
import BadgeStreak from './pages/BadgeStreak';

/**
 * App – Root component with React Router.
 *
 * Layout:
 *   - Landing page (/) renders full-width with its own footer
 *   - Auth page (/auth) renders full-screen without sidebar
 *   - Test engine (/test) renders full-screen without header/sidebar
 *   - All other pages render with Header + Sidebar + Main content
 */
function AppLayout() {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const isAuth = location.pathname === '/auth';
  const isTest = location.pathname === '/test';

  if (isTest) return <Test />;

  if (isLanding) {
    return (
      <>
        <Header />
        <LandingPage />
      </>
    );
  }

  if (isAuth) {
    return (
      <>
        <Header />
        <AuthForm />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-[calc(100vh-4rem)] overflow-y-auto">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learn" element={<LearningPath />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/badges" element={<BadgeStreak />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
}
