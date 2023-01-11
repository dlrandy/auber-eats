import React from 'react';
import { DarkModeContext, SetDarkModeContext } from '../contexts/ModeContext';
import { useTheme } from "../hooks/useTheme";
import { useEffect } from 'react';
import { useRouter } from 'next/router';



export function DarkModeContextProvider({ children }:{children:React.ReactNode}) {
    const [theme, setTheme] = useTheme();
    const router = useRouter();
    useEffect(()=>{
        if (!router.isReady) {
            return;
        }
        function preferencesListener({matches:isDark}:any) {
            setTheme(isDark ? 'dark':'light');
        }

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', preferencesListener)
        
    });
    return (
        <DarkModeContext.Provider value={theme}>
            <SetDarkModeContext.Provider value={setTheme}>
                {children}
            </SetDarkModeContext.Provider>
        </DarkModeContext.Provider>
    );
}
