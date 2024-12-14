import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { lightTheme, darkTheme, Theme, natureTheme } from '../themes/theme';
import { useColorScheme } from 'react-native';

type ThemeContextType = {
    theme: Theme;
    toggleTheme: (themeName: string) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const colorScheme = useColorScheme();
    const defaultTheme = colorScheme === 'dark' ? darkTheme : lightTheme;

    const [theme, setTheme] = useState(defaultTheme);

    useEffect(() => {
        setTheme(defaultTheme);
    }, [colorScheme]);

    const toggleTheme = (themeName: string) => {
        // Optional: Manual toggle logic if needed
        // console.log('theme: ', themeName);
        switch (themeName) {
            case 'light':
                setTheme(lightTheme);
                break;
            case 'dark': 
                setTheme(darkTheme);
                break;
            default: 
                console.warn('unknown theme:', themeName);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};