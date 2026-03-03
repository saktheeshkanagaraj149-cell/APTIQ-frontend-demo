import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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

// Teacher pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import CreateClass from './pages/teacher/CreateClass';
import CreateTest from './pages/teacher/CreateTest';
import NotesWebhook from './pages/teacher/NotesWebhook';
import StudentAnalytics from './pages/teacher/StudentAnalytics';
import TestResults from './pages/teacher/TestResults';
import TeacherSidebar from './components/teacher/TeacherSidebar';

// Student pages
import StudentDashboard from './pages/student/StudentDashboard';
import JoinClass from './pages/student/JoinClass';
import TakeTest from './pages/student/TakeTest';
import StudentSidebar from './components/student/StudentSidebar';

import { useAuth } from './context/AuthContext';
import { seedDemoData } from './data/classStore';

// Seed demo data once
seedDemoData();

/** Teacher layout: navy sidebar + header */
function TeacherLayout({ children }) {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <div className="flex">
        <TeacherSidebar />
        <main className="flex-1 min-h-[calc(100vh-4rem)] overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

/** Student layout: navy sidebar + header */
function StudentLayout({ children }) {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <div className="flex">
        <StudentSidebar />
        <main className="flex-1 min-h-[calc(100vh-4rem)] overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

/** Protect routes by role */
function RequireRole({ role, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth" replace />;
  if (user.role !== role) return <Navigate to={user.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard'} replace />;
  return children;
}

function AppLayout() {
  const location = useLocation();
  const { user } = useAuth();
  const isLanding = location.pathname === '/';
  const isAuth = location.pathname === '/auth';
  const isTest = location.pathname === '/test';
  const isTeacher = location.pathname.startsWith('/teacher');
  const isStudentRoute = location.pathname.startsWith('/student');

  if (isTest) return <Test />;

  if (isLanding) return <><Header /><LandingPage /></>;

  if (isAuth) {
    // Redirect if already logged in
    if (user) return <Navigate to={user.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard'} />;
    return <><Header /><AuthForm /></>;
  }

  if (isTeacher) {
    return (
      <RequireRole role="teacher">
        <TeacherLayout>
          <Routes>
            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher/classes" element={<CreateClass />} />
            <Route path="/teacher/create-test" element={<CreateTest />} />
            <Route path="/teacher/notes" element={<NotesWebhook />} />
            <Route path="/teacher/analytics" element={<StudentAnalytics />} />
            <Route path="/teacher/results" element={<TestResults />} />
          </Routes>
        </TeacherLayout>
      </RequireRole>
    );
  }

  if (isStudentRoute) {
    return (
      <RequireRole role="student">
        <Routes>
          {/* Full-screen test (no sidebar) */}
          <Route path="/student/test/:testId" element={<TakeTest />} />
          <Route path="/student/*" element={
            <StudentLayout>
              <Routes>
                <Route path="/dashboard" element={<StudentDashboard />} />
                <Route path="/join-class" element={<JoinClass />} />
              </Routes>
            </StudentLayout>
          } />
        </Routes>
      </RequireRole>
    );
  }

  // Original student/general pages
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
