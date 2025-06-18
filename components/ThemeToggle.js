'use client';
import { useStore } from '../store/useStore';

export default function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useStore();

  return (
    <button onClick={toggleDarkMode} className="absolute top-2 right-2 text-sm">
      {darkMode ? '🌙 Dark' : '☀️ Light'} Mode
    </button>
  );
}