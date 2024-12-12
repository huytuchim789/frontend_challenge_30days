import { useThemeStore } from '@/stores/themeStore';
import { theme } from '@/styles/theme';
import { Todo, useTodoStore } from '@/stores/todoStore';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const currentTheme = isDarkMode ? theme.dark : theme.light;
  const { toggleTodo, deleteTodo } = useTodoStore();

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="todo-item">
        <button
          className={`checkbox ${todo.completed ? 'checked' : ''}`}
          onClick={() => {
            toggleTodo(todo.id);
          }}
        >
          <div className="checkbox-background" />
          {todo.completed && (
            <img src="/images/icon-check.svg" alt="check" className="check-icon" />
          )}
        </button>
        <p className={`todo-text ${todo.completed ? 'completed' : ''}`}>{todo.text}</p>
        <button
          className="delete-btn"
          onClick={() => {
            deleteTodo(todo.id);
          }}
        >
          <img src="/images/icon-cross.svg" alt="Delete todo" />
        </button>
      </div>

      <style jsx>{`
        .todo-item {
          display: flex;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid ${currentTheme.border};
          gap: 20px;
          cursor: grab;
        }

        .todo-item:active {
          cursor: grabbing;
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
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
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

        .todo-text {
          flex: 1;
          color: ${currentTheme.text};
          transition: color 0.3s ease;
        }

        .todo-text.completed {
          color: ${currentTheme.textMuted};
          text-decoration: line-through;
        }

        .delete-btn {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .todo-item:hover .delete-btn {
          opacity: 1;
        }

        .delete-btn:hover img {
          filter: brightness(0.8);
        }
      `}</style>
    </div>
  );
};

export default TodoItem;
