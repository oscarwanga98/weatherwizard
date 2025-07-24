import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = 'light' | 'dark' | 'cosmic';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Validate saved theme - if invalid, fallback to system preference
    const validThemes: Theme[] = ['light', 'dark', 'cosmic'];
    const initialTheme = (savedTheme && validThemes.includes(savedTheme)) 
      ? savedTheme 
      : (systemPrefersDark ? 'dark' : 'light');
    
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    // Remove all theme classes
    document.documentElement.classList.remove('dark', 'cosmic');
    
    // Apply the new theme class (light is default, no class needed)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (newTheme === 'cosmic') {
      document.documentElement.classList.add('cosmic');
    }
  };

  const toggleTheme = () => {
    // Cycle through themes: light → dark → cosmic → light
    const themeOrder: Theme[] = ['light', 'dark', 'cosmic'];
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    const newTheme = themeOrder[nextIndex];
    
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
