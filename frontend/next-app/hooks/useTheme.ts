import { useState, useEffect } from 'react';
import { getColorPreference } from "../utilities/localStorage";
import { useLocalStorage } from "./useLocalStorage";

export type Theme = 'light' | 'dark';

export function useTheme() {
    const [theme, setTheme] = useState<Theme>('light');
    useEffect(()=>{
        setTheme(getColorPreference() as Theme);
        
    });
    return useLocalStorage<Theme>('theme', theme as Theme);
}