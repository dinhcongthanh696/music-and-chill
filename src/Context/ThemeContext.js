import { createContext , useState } from "react";

export const ThemeContext = createContext({
    theme : 'ocean-theme'
}) 

export function ThemeContextProvider({children}){
    const [theme , setTheme] = useState('violet-theme')

    return (
        <ThemeContext.Provider value={{
            theme : theme,
            setTheme : setTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}