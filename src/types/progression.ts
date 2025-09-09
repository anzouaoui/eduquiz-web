export type ThemeKey = 'fr' | 'math' | 'eng' | 'hg' | 'svt' | 'chim' | 'mus';

export interface ThemeProgress {
  id: ThemeKey;
  name: string;
  emoji: string;
  isCompleted: boolean;
}

export interface LevelProgress {
  id: string;
  name: string;
  themes: ThemeProgress[];
}

export interface UserProgress {
  levels: LevelProgress[];
  completionPercentage: number;
  totalTimeSpent: number; // in seconds
}

// Helper function to get theme display name
export function getThemeDisplayName(theme: ThemeKey): string {
  const names: Record<ThemeKey, string> = {
    fr: 'Français',
    math: 'Mathématiques',
    eng: 'Anglais',
    hg: 'Histoire-Géo',
    svt: 'SVT',
    chim: 'Chimie',
    mus: 'Musique'
  };
  return names[theme] || theme;
}

// Helper function to get theme emoji
export function getThemeEmoji(theme: ThemeKey): string {
  const emojis: Record<ThemeKey, string> = {
    fr: '🇫🇷',
    math: '🔢',
    eng: '🇬🇧',
    hg: '🌍',
    svt: '🔬',
    chim: '🧪',
    mus: '🎵'
  };
  return emojis[theme] || '❓';
}
