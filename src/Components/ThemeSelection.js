import { ThemeContext } from "../Context/ThemeContext";
import { useContext } from "react";
import { THEMES } from "./Constants";
import './ThemeSelection.css'
export default function ThemeSelection(){
    const themeValue = useContext(ThemeContext);
    const setTheme = (theme) => {
        themeValue.setTheme(theme);
    }

    return (
        <div className="theme-selection">
            {THEMES && THEMES.map((theme , index) => {
                return (
                    <div className="theme-item" key={index}>
                        <img  className="theme-thumbnail" src={theme.src} title="Dùng thử" onClick={() => setTheme(theme.theme)}/>
                        <p className="theme-description">{theme.description}</p>
                    </div>
                )
            })}
        </div>
    )
}