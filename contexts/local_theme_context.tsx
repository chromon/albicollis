import { createContext, ReactNode, useEffect, useState } from "react";
import { natureTheme, nightTheme, Theme } from "../themes/theme";
import { useColorScheme } from "react-native";

type ThemeContextType = {
    theme: Theme;
    toggleTheme: (themeName: string) => void;
};

export const LocalThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const LocalThemeProvider = ({ children }: { children: ReactNode }) => {
    const colorScheme = useColorScheme();
    const defaultTheme = colorScheme === 'dark' ? nightTheme : natureTheme;
    
    const [theme, setTheme] = useState(defaultTheme);

    useEffect(() => {
        setTheme(defaultTheme);
    }, [colorScheme]);

    const toggleTheme = (themeName: string) => {
        switch (themeName) {
            case 'night': 
                setTheme(nightTheme);
                break;
            case 'nature':
                setTheme(natureTheme);
                break;
            default: 
                console.warn('unknown local theme:', themeName);
        }
    };
  
    return (
      <LocalThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </LocalThemeContext.Provider>
    );
  };