import { useTheme } from '../contexts/ThemeContext';

export default function Container({ children }) {
    const { theme } = useTheme();
    
    const isDark = theme === 'dark';
    
    return (
        <div
            style={{
                maxWidth: 900,
                margin: "40px auto",
                padding: 20,
                background: isDark ? "#333" : "#e0e0e0",   
                color: isDark ? "#fff" : "#000",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
        >
            {children}
        </div>
    );
}
