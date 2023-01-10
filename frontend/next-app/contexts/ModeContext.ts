import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { Theme, useTheme } from "../hooks/useTheme";


export const DarkModeContext = createContext<Theme>('light');
export const SetDarkModeContext = createContext<Dispatch<SetStateAction<Theme>>>(
    (value) => {
        console.log('Default function:', value);
    }
);

export function useDarkModeContext() {
    return useContext(DarkModeContext);
}

export function useSetDarkModeContext() {
    return useContext(SetDarkModeContext);
}


