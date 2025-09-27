import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useThemeMode } from '../../context/ThemeContext.jsx';
import { Button } from '../ui/button.jsx';
import { Moon, Sun } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { mode, toggle } = useThemeMode();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4">
        <NavLink to="/dashboard" className="font-semibold">Samudra Manthan</NavLink>
        <nav className="ml-6 hidden items-center gap-4 text-sm md:flex">
          <NavLink to="/dashboard/fish" className={({isActive})=>`hover:underline ${isActive?'font-semibold':''}`}>Fish Insights</NavLink>
          <NavLink to="/dashboard/oceanography" className={({isActive})=>`hover:underline ${isActive?'font-semibold':''}`}>Oceanography</NavLink>
          <NavLink to="/dashboard/fishing-ratio" className={({isActive})=>`hover:underline ${isActive?'font-semibold':''}`}>Fishing Ratio</NavLink>
          <NavLink to="/policies" className={({isActive})=>`hover:underline ${isActive?'font-semibold':''}`}>Policies</NavLink>
          <NavLink to="/about" className={({isActive})=>`hover:underline ${isActive?'font-semibold':''}`}>About</NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          {user ? (
            <>
              <span className="hidden text-sm text-muted-foreground md:block">{user.email}</span>
              <Button variant="outline" onClick={() => { logout(); navigate('/login'); }}>Logout</Button>
            </>
          ) : (
            <Button onClick={() => navigate('/login')}>Login</Button>
          )}
        </div>
      </div>
    </header>
  );
}
