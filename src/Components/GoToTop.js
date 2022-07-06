import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../Context/ThemeContext";
import { useContext } from "react";
export default function GoToTop({
    isDisplayedGototop
}){
    const themeValue = useContext(ThemeContext);
    return (
        <div className={`go-to-top ${themeValue.theme}`} style={{opacity : isDisplayedGototop ? 1 : 0}}>
          <a href='#top'> <FontAwesomeIcon icon={faArrowUp} /> GO TO TOP </a>
        </div>
    )
}