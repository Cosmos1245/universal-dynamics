import React, { createContext, useState, useEffect } from 'react';


export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('Light Theme');

   
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.body.classList.add(savedTheme === 'Dark Theme' ? 'dark-theme' : 'light-theme');
        } else {
            document.body.classList.add('light-theme');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'Light Theme' ? 'Dark Theme' : 'Light Theme';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.body.classList.toggle('dark-theme', newTheme === 'Dark Theme');
        document.body.classList.toggle('light-theme', newTheme === 'Light Theme');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

