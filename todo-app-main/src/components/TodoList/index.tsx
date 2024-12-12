import { useThemeStore } from '@/stores/themeStore';
import { theme } from '@/styles/theme';
import { useTodoStore } from '@/stores/todoStore';
import { DndContext, DragEndEvent, MouseSensor, closestCenter, useSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TodoItem from './TodoItem';

import { useState } from 'react';


const TodoList = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const currentTheme = isDarkMode ? theme.dark : theme.light;
  const [newTodo, setNewTodo] = useState('');
  const { todos, filter, addTodo, setFilter, clearCompleted, reorderTodos } = useTodoStore();
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: { delay: 100, tolerance: 5 },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id);
      const newIndex = todos.findIndex((todo) => todo.id === over.id);
      reorderTodos(oldIndex, newIndex);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter((todo) => !todo.completed).length;
  return (
    <div className="todo-container">
      <form onSubmit={handleSubmit} className="input-container">
        <span className="checkbox" />
        <input
          type="text"
          placeholder="Create a new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
      </form>

      <div className="todos-list">
        <DndContext sensors={[mouseSensor]} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={filteredTodos} strategy={verticalListSortingStrategy}>
            {filteredTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </SortableContext>
        </DndContext>

        {todos.length > 0 && (
          <div className="list-footer">
            <span>{activeTodosCount} items left</span>
            <div className="filters desktop-filters">
              <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
                All
              </button>
              <button
                className={filter === 'active' ? 'active' : ''}
                onClick={() => setFilter('active')}
              >
                Active
              </button>
              <button
                className={filter === 'completed' ? 'active' : ''}
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
            </div>
            <button className="clear-completed" onClick={clearCompleted}>
              Clear Completed
            </button>
          </div>
        )}
      </div>
      <div className="mobile-filters">
        <div className="filters">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
            All
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      {todos.length > 0 && <p className="drag-drop-text">Drag and drop to reorder list</p>}

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

        .todos-list {
          background: ${currentTheme.cardBackground};
          border-radius: 5px;
          overflow: hidden;
          box-shadow: 0 35px 50px -15px rgba(0, 0, 0, 0.1);
        }

        .list-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          color: ${currentTheme.textMuted};
          font-size: 14px;
        }

        .filters {
          display: flex;
          gap: 16px;
        }

        .filters button,
        .clear-completed {
          background: none;
          border: none;
          color: ${currentTheme.textMuted};
          cursor: pointer;
          font-family: 'Josefin Sans', sans-serif;
          font-weight: 700;
          transition: color 0.3s ease;
        }

        .filters button:hover,
        .clear-completed:hover {
          color: ${currentTheme.text};
        }

        .filters button.active {
          color: ${currentTheme.primary};
        }

        .drag-drop-text {
          text-align: center;
          color: ${currentTheme.textMuted};
          font-size: 14px;
          margin-top: 48px;
        }

        .desktop-filters {
          display: flex;
        }

        .mobile-filters {
          display: none;
          background: ${currentTheme.cardBackground};
          border-radius: 5px;
          box-shadow: 0 35px 50px -15px rgba(0, 0, 0, 0.1);
        
        }

        .mobile-filters .filters {
          justify-content: center;
          padding: 15px;
        }

        @media (max-width: 550px) {
          .desktop-filters {
            display: none;
          }

          .mobile-filters {
            display: block;
            margin-top: -1px;
          }

          .todos-list {
            margin-bottom: 16px;
          }

          .list-footer {
            padding: 16px 20px;
          }

          .input-container {
            padding: 14px 20px;
          }

          .todo-item {
            padding: 16px 20px;
          }

          .drag-drop-text {
            margin-top: 40px;
            margin-bottom: 40px;
            font-size: 14px;
            color: ${currentTheme.textMuted};
          }
        }
      `}</style>
    </div>
  );
};

export default TodoList;
