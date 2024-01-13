'use client'

import { createContext, useState, useContext } from "react";

type ThemeContextType = {
    isLightTheme: boolean;
    setIsLightTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default function ThemeProvider({children}: {children: React.ReactNode}) {

    const [isLightTheme, setIsLightTheme] = useState<boolean>(false)

    return (
        <ThemeContext.Provider value={{
            isLightTheme,
            setIsLightTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};