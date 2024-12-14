import { useContext } from "react";
import { LocalThemeContext } from "../contexts/local_theme_context";

export const useLocalTheme = () => {
    const context = useContext(LocalThemeContext);
    if (!context) {
        throw new Error('useLocalTheme must be used within a LocalThemeProvider');
    }
    return context;
};