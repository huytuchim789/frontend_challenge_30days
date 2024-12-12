import { useThemeStore } from '@/stores/themeStore';

const Header = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <header className="header">
      <h1>TODO</h1>
      <button onClick={toggleTheme} className="theme-toggle">
        <img
          src={isDarkMode ? '/images/icon-sun.svg' : '/images/icon-moon.svg'}
          alt="Toggle theme"
        />
      </button>

      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        h1 {
          color: white;
          text-transform: uppercase;
          letter-spacing: 15px;
          font-size: 40px;
          font-weight: 700;
        }

        .theme-toggle {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .theme-toggle:hover {
          opacity: 0.8;
        }

        img {
          width: 26px;
          height: 26px;
        }
      `}</style>
    </header>
  );
};

export default Header;
