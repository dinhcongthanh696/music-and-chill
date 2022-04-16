import ToastMessage from "./ToastMessage";
import {useState , useRef, useEffect} from 'react';
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
function ToastMessages(){
    const [toastMessages,setToastMessages] = useState([]);
    
    const handleAddNewSong = (toastMessage) => {
        let newToastId;
        if(toastMessages.length == 0 ){
            newToastId = 1;
        }else{
            newToastId = toastMessages[toastMessages.length - 1].id + 1;
        }

        toastMessage.id = newToastId;  // add id for toastMessage

        setToastMessages(prevState => {
            const newToastMessages =  [
                    ...prevState,
                    toastMessage
                ]
                toastMessagesRef.current = newToastMessages;
                return newToastMessages;    
            }
        )

        setTimeout(() => {
            document.getElementsByClassName("toast-message")[0].classList.add('toast-message--fade-out');
            setTimeout(() => {
                handleRemoveToastMessage(newToastId);
            },800);
        },5000) 
    }

    const handleRemoveToastMessage = (removedToastId) => {
            if(toastMessagesRef.current.filter(toastMessage => {
                return toastMessage.id === removedToastId
            }).length !== 0) {
                const newToastMessages = [];
                for(let i = 0 ; i < toastMessagesRef.current.length ; i++){
                    if(toastMessagesRef.current[i].id !== removedToastId){
                        newToastMessages.push(toastMessagesRef.current[i]);
                    }
                } 
                setToastMessages(newToastMessages); // for re-rendering
                toastMessagesRef.current = newToastMessages;
        }
    }

    const toastMessagesRef = useRef();

    return (
        <div className="toast-messages">
            {toastMessages.map((toastMessage,index) => {
                return (
                    <ToastMessage 
                        key={toastMessage.id}
                        type={toastMessage.type} 
                        title={toastMessage.title}
                        description={toastMessage.description}
                        icon={toastMessage.icon}
                        closeToastMessage={handleRemoveToastMessage}
                        id={toastMessage.id}
                        index={index}
                    />
                )
            }) }
            <button onClick={() => {
                const newSong = {
                    type : 'success',
                    description : 'You have added new song successfully',
                    title : 'Add Successuly',
                    icon : faCheckCircle
                };
                handleAddNewSong(newSong);
            }}>Add new song</button>
        </div>
    )

}

export default ToastMessages;