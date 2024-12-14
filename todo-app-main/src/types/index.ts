// Theme type definition
export interface Theme {
  colors: {
    primary: string;
    checkBackground: string;
    background: string;
    cardBackground: string;
    text: string;
    textMuted: string;
    border: string;
    hover: string;
  }
}

// Todo item interface
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

// Theme store state interface
export interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
} 