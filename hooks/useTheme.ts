import { useContext } from "react";
import { ThemeContext } from "../contexts/theme_context";

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};