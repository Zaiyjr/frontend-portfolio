import { faTerminal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-500 transition-colors duration-300 dark:border-slate-900 dark:bg-slate-950">

      <p>© {new Date().getFullYear()} <span className='text-emerald-400'><FontAwesomeIcon icon={faTerminal}/> ZAIY.DEV.</span> All rights reserved.</p>
    </footer>
  );
}
