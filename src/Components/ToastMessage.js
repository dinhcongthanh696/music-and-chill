import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import './ToastMessage.css'
function ToastMessage({
    type,
    title = '',
    description = '',
    icon,
    closeToastMessage,
    id
}){
    const toastMessageRef = useRef();
    return (
        <div className={`toast-message toast-message--${type}`} ref={toastMessageRef}>
            <div className="toast-icon"><FontAwesomeIcon icon={icon} /> </div>
            <div className="toast-center">
                <div className="toast-title">{title} </div>
                <div className="toast-description">{description}</div>
            </div>
            <div className="toast-close" onClick={() => {
                toastMessageRef.current.classList.add('toast-message--fade-out');
                setTimeout(() => {
                    closeToastMessage(id);
                },800);
            }}>
                <FontAwesomeIcon icon={faClose}/>
            </div>
        </div>
    )
}

export default ToastMessage;