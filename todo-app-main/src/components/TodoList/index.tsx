import { useThemeStore } from '@/stores/themeStore';
import { theme } from '@/styles/theme';
import { useState } from 'react';

const TodoList = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const currentTheme = isDarkMode ? theme.dark : theme.light;
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="todo-container">
      <div className="input-container">
        <button
          className={`checkbox ${isChecked ? 'checked' : ''}`}
          onClick={() => setIsChecked(!isChecked)}
        >
          <div className="checkbox-background" />
          {isChecked && <img src="/images/icon-check.svg" alt="check" className="check-icon" />}
        </button>
        <input type="text" placeholder="Create a new todo..." />
      </div>

      <style jsx>{`
        .todo-container {
          width: 100%;
        }

        .input-container {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px 24px;
          background-color: ${currentTheme.cardBackground};
          border-radius: 5px;
          margin-bottom: 24px;
          transition: background-color 0.3s ease;
        }

        .checkbox {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1px solid ${currentTheme.border};
          flex-shrink: 0;
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          background: none;
          transition: border-color 0.3s ease;
          overflow: hidden;
        }

        .checkbox-background {
          position: absolute;
          inset: -1px;
          background: linear-gradient(135deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .checkbox.checked .checkbox-background {
          opacity: 1;
        }

        .checkbox::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 50%;
          padding: 1px;
          background: linear-gradient(135deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%));
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .checkbox:hover:not(.checked)::before {
          opacity: 1;
        }

        .check-icon {
          width: 10px;
          height: 10px;
          position: relative;
          z-index: 1;
          transform: scale(0);
          transition: transform 0.3s ease;
        }

        .checkbox.checked .check-icon {
          transform: scale(1);
        }

        input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          font-size: 18px;
          color: ${currentTheme.text};
          font-family: 'Josefin Sans', sans-serif;
        }

        input::placeholder {
          color: ${currentTheme.textMuted};
        }
      `}</style>
    </div>
  );
};

export default TodoList;
