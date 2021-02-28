import { useEffect, useState } from 'react';
import { setToLS, getFromLS } from '../utils/storage';
import _ from 'lodash';
// Returns the selected theme from localStorage and a boolean indicating if the theme is loaded correctly
export const useTheme = () => {
    const themes = getFromLS('all-themes');
    const [theme, setTheme] = useState(themes.data.light);
    const [themeLoaded, setThemeLoaded] = useState(false);
    // Applies the theme 
    const setMode = mode => {
        setToLS('theme', mode);
        setTheme(mode);
    };
    useEffect(() => {
        const localTheme = getFromLS('theme');
        localTheme ? setTheme(localTheme) : setTheme(themes.data.light);
        setThemeLoaded(true);
    }, []);

    return { theme, themeLoaded, setMode };
}