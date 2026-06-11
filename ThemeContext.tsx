import React from 'react';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark';
};

export function ThemeProvider({ children, defaultTheme = 'light' }: ThemeProviderProps) {
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', defaultTheme === 'dark');
  }, [defaultTheme]);

  return <>{children}</>;
}
