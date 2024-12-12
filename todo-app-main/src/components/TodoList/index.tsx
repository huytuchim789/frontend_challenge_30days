import { useThemeStore } from '@/stores/themeStore';
import { theme } from '@/styles/theme';

const TodoList = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <div className="todo-container">
      <div className="input-container">
        <span className="checkbox" />
        <input type="text" placeholder="Create a new todo..." />
      </div>

      <style jsx>{`
        .todo-container {
          width: 100%;
        }

        .input-container {
          width: 100%;
          background: ${currentTheme.cardBackground};
          padding: 20px 24px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 24px;
          transition: background-color 0.3s ease;
        }

        .checkbox {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1px solid ${currentTheme.border};
          flex-shrink: 0;
        }

        input {
          width: 100%;
          background: none;
          border: none;
          color: ${currentTheme.text};
          font-family: 'Josefin Sans', sans-serif;
          font-size: 18px;
          outline: none;
        }

        input::placeholder {
          color: ${currentTheme.textMuted};
        }
      `}</style>
    </div>
  );
};

export default TodoList; 