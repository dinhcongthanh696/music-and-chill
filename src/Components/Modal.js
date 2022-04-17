import './Modal.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
function Modal(
    {
        heading,
        children
    }
){
    return (
        <div className='modal'>
            <div className='modal__inner'>
                <div className='modal__header'>
                    <h1 className='modal__heading'>{heading}</h1>
                    <FontAwesomeIcon icon={faXmark} className="modal__close-icon" />
                </div>
                <div className='modal__content'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;
