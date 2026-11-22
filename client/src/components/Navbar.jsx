import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from './Icon.jsx';

export default function Navbar() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') || 'dark'; } catch { return 'dark'; }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch { /* ignore */ }
  }, [theme]);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand"><Icon name="chef" size={24} className="brand-icon" /> <span className="brand-text">Recipe Book</span></NavLink>
        <nav>
          <NavLink to="/" end>Recipes</NavLink>
          <NavLink to="/favourites">Favourites</NavLink>
          <NavLink to="/recipes/new" className="btn btn-small"><Icon name="plus" size={15} /> Add Recipe</NavLink>
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
          </button>
        </nav>
      </div>
    </header>
  );
}
