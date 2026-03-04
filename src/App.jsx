import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import AuthForm from './pages/AuthForm';

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

// Student feature pages (shared)
import LearningPath from './pages/LearningPath';
import Test from './pages/Test';
import Leaderboard from './pages/Leaderboard';
import Analytics from './pages/Analytics';
import BadgeStreak from './pages/BadgeStreak';

import { useAuth } from './context/AuthContext';

/** Mobile sidebar toggle button */
function SidebarToggle({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="md:hidden fixed bottom-6 left-6 z-30 w-12 h-12 bg-navy text-cream rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
      aria-label="Open navigation"
      id="sidebar-toggle"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
  );
}

/** Teacher layout: responsive sidebar + header */
function TeacherLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <div className="flex">
        <TeacherSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-h-[calc(100vh-4rem)] overflow-y-auto w-full">
          {children}
        </main>
      </div>
      <SidebarToggle onClick={() => setSidebarOpen(true)} />
    </div>
  );
}

/** Student layout: responsive sidebar + header */
function StudentLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <div className="flex">
        <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-h-[calc(100vh-4rem)] overflow-y-auto w-full">
          {children}
        </main>
      </div>
      <SidebarToggle onClick={() => setSidebarOpen(true)} />
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
  const isTeacher = location.pathname.startsWith('/teacher');
  const isStudentRoute = location.pathname.startsWith('/student');

  if (isLanding) return <><Header /><LandingPage /></>;

  if (isAuth) {
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
          {/* Full-screen test pages (no sidebar) */}
          <Route path="/student/test/:testId" element={<TakeTest />} />
          <Route path="/student/mock-test" element={<Test />} />
          <Route path="/student/*" element={
            <StudentLayout>
              <Routes>
                <Route path="/dashboard" element={<StudentDashboard />} />
                <Route path="/join-class" element={<JoinClass />} />
                <Route path="/learn" element={<LearningPath />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/badges" element={<BadgeStreak />} />
              </Routes>
            </StudentLayout>
          } />
        </Routes>
      </RequireRole>
    );
  }

  // Catch-all: redirect to auth
  return <Navigate to="/auth" replace />;
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
