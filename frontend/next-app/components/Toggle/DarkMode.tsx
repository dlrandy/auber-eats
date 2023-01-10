import {
  useDarkModeContext,
  useSetDarkModeContext,
} from "../../contexts/ModeContext";
import React from 'react';

export function DarkModeToggle({ className }: { className?: string }) {
  const darkMode = useDarkModeContext();
  const setStoredMode = useSetDarkModeContext();
 return <label>
      <input
        type="checkbox"
        checked={darkMode === 'dark'}
        onChange={(ev:React.ChangeEvent<HTMLInputElement>) => {
          setStoredMode(ev.target.checked ? 'dark' : 'light');
        }}
      />{' '}
      Dark
    </label>;
}
