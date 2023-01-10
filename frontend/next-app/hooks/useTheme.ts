import { getColorPreference } from "../utilities/localStorage";
import { useLocalStorage } from "./useLocalStorage";

export type Theme = 'light' | 'dark';

export function useTheme() {
    const theme = getColorPreference();
    return useLocalStorage<Theme>('theme', theme as Theme);
}