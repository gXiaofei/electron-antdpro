import { nativeTheme } from 'electron';
import { set } from './electronStore';

export type themeType = 'dark' | 'light' | 'system';

function darkMode(theme: themeType) {
    nativeTheme.themeSource = theme;
    if (nativeTheme.shouldUseDarkColors) {
        set('currentDarkMode', 'dark');
    } else {
        set('currentDarkMode', 'light');
    }
    return nativeTheme.shouldUseDarkColors;
}

export default darkMode;
