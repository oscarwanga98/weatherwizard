import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = 'light' | 'dark' | 'cosmic';
type SeasonalTheme = 'none' | 'christmas' | 'halloween';

interface ThemeContextType {
  theme: Theme;
  seasonalTheme: SeasonalTheme;
  toggleTheme: () => void;
  toggleSeasonalTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [theme, setTheme] = useState<Theme>('light');
  const [seasonalTheme, setSeasonalTheme] = useState<SeasonalTheme>('none');

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedSeasonalTheme = localStorage.getItem('seasonalTheme') as SeasonalTheme;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Validate saved themes
    const validThemes: Theme[] = ['light', 'dark', 'cosmic'];
    const validSeasonalThemes: SeasonalTheme[] = ['none', 'christmas', 'halloween'];
    
    const initialTheme = (savedTheme && validThemes.includes(savedTheme)) 
      ? savedTheme 
      : (systemPrefersDark ? 'dark' : 'light');
    
    const initialSeasonalTheme = (savedSeasonalTheme && validSeasonalThemes.includes(savedSeasonalTheme))
      ? savedSeasonalTheme
      : 'none';
    
    setTheme(initialTheme);
    setSeasonalTheme(initialSeasonalTheme);
    applyThemes(initialTheme, initialSeasonalTheme);
  }, []);

  const applyThemes = (newTheme: Theme, newSeasonalTheme: SeasonalTheme) => {
    // Remove all theme classes
    document.documentElement.classList.remove('dark', 'cosmic', 'christmas', 'halloween');
    
    // Apply the base theme class
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (newTheme === 'cosmic') {
      document.documentElement.classList.add('cosmic');
    }
    
    // Apply seasonal theme class
    if (newSeasonalTheme !== 'none') {
      document.documentElement.classList.add(newSeasonalTheme);
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
    applyThemes(newTheme, seasonalTheme);
  };

  const toggleSeasonalTheme = () => {
    // Cycle through seasonal themes: none → christmas → halloween → none
    const seasonalOrder: SeasonalTheme[] = ['none', 'christmas', 'halloween'];
    const currentIndex = seasonalOrder.indexOf(seasonalTheme);
    const nextIndex = (currentIndex + 1) % seasonalOrder.length;
    const newSeasonalTheme = seasonalOrder[nextIndex];
    
    setSeasonalTheme(newSeasonalTheme);
    localStorage.setItem('seasonalTheme', newSeasonalTheme);
    applyThemes(theme, newSeasonalTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, seasonalTheme, toggleTheme, toggleSeasonalTheme }}>
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
