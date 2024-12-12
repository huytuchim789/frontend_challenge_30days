import TodoList from './components/TodoList';
import Header from './components/Header';
import { useThemeStore } from './stores/themeStore';
import { theme } from './styles/theme';

function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <div className="app">
      <div className="layout" />
      <main className="container">
        <Header />
        <TodoList />
      </main>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .app {
          min-height: 100vh;
          background-color: ${currentTheme.background};
          position: relative;
        }
        .layout {
          position: absolute;
          inset: 0;
          z-index: 0;
          background-image: url('/images/bg-desktop-${isDarkMode ? 'dark' : 'light'}.jpg');
          background-size: cover;
          background-position: center;
          height: 300px;
          background-repeat: no-repeat;
        }
        .container {
          position: relative;
          z-index: 1;
          max-width: 540px;
          margin: 0 auto;
          padding: 70px 24px;
        }

        body {
          font-family: 'Josefin Sans', sans-serif;
          font-size: 18px;
          line-height: 1;
          transition:
            color 0.3s ease,
            background-color 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default App;
