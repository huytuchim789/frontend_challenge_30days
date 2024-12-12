import TodoList from './components/TodoList';
import Header from './components/Header';
import { useThemeStore } from './stores/themeStore';
import { theme } from './styles/theme';

function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <div className="app">
      <div className="background" />
      <main className="container">
        <Header />
        <TodoList />
      </main>

      <style jsx>{`
        .app {
          min-height: 100vh;
          background: ${currentTheme.background};
          position: relative;
        }

        .background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 300px;
          background-image: url(${isDarkMode
            ? '/images/bg-desktop-dark.jpg'
            : '/images/bg-desktop-light.jpg'});
          background-size: cover;
          background-position: center;
          z-index: 0;
        }

        .container {
          position: relative;
          z-index: 1;
          max-width: 540px;
          margin: 0 auto;
          padding: 70px 24px;
        }

        @media (max-width: 375px) {
          .background {
            background-image: url(${isDarkMode
              ? '/images/bg-mobile-dark.jpg'
              : '/images/bg-mobile-light.jpg'});
          }
        }
      `}</style>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Josefin Sans', sans-serif;
          font-size: 18px;
          line-height: 1;
          color: ${currentTheme.text};
          transition: color 0.3s ease, background-color 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default App;
