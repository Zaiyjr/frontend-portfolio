import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTerminal, faCode, faBriefcase, faMicrochip, faEnvelope, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

export default function Navbar({ theme, onToggleTheme }) {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'ໜ້າຫຼັກ', icon: <FontAwesomeIcon icon={faCode} /> },
    { path: '/projects', label: 'ຜົນງານ', icon: <FontAwesomeIcon icon={faBriefcase} /> },
    { path: '/skills', label: 'ທັກສະ', icon: <FontAwesomeIcon icon={faMicrochip} /> },
    { path: '/contact', label: 'ຕິດຕໍ່', icon: <FontAwesomeIcon icon={faEnvelope} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200 transition-colors duration-300 dark:bg-slate-950/70 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-emerald-400 tracking-wider">
          <FontAwesomeIcon icon={faTerminal} className="text-lg" />
          <span className="hidden xs:inline sm:inline">ZAIY.DEV</span>
        </Link>
        
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="flex gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-2.5 sm:px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300
                    ${isActive 
                      ? 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400' 
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-900'
                    }`}
                >
                  <span className="text-xs sm:text-sm">{item.icon}</span>
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors duration-300 hover:bg-slate-100 hover:text-slate-950 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-slate-100"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
          >
            <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
          </button>
        </div>
      </div>
    </nav>
  );
}
