import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { AIProvider } from './context/AIContext.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import FishInsights from './pages/FishInsights.jsx';
import Oceanography from './pages/Oceanography.jsx';
import FishingRatio from './pages/FishingRatio.jsx';
import Policies from './pages/Policies.jsx';
import About from './pages/About.jsx';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AIProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<FishInsights />} />
                  <Route path="fish" element={<FishInsights />} />
                  <Route path="oceanography" element={<Oceanography />} />
                  <Route path="fishing-ratio" element={<FishingRatio />} />
                </Route>
                <Route path="/policies" element={<ProtectedRoute><Policies /></ProtectedRoute>} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </AIProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
