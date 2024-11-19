import React, { createContext, useState, useEffect } from 'react';

// Create a Theme Context
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('Light Theme');

    // Load the theme from localStorage on initial load
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.body.classList.add(savedTheme === 'Dark Theme' ? 'dark-theme' : 'light-theme');
        } else {
            document.body.classList.add('light-theme');
        }
    }, []);

    // Update the theme when it changes
    const toggleTheme = () => {
        const newTheme = theme === 'Light Theme' ? 'Dark Theme' : 'Light Theme';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        // Apply the theme immediately to the body
        document.body.classList.toggle('dark-theme', newTheme === 'Dark Theme');
        document.body.classList.toggle('light-theme', newTheme === 'Light Theme');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

