import { ThemeContext } from "../../Context/ThemeContext";
import { ReactNode, useContext } from "react";
import './PlayList.css'

export default function PlayList() : ReactNode{
    
    const {theme} : {theme : string} = useContext(ThemeContext);
    
    return (
        <div className={`play-list ${theme}`}>
            
        </div>
    )
}