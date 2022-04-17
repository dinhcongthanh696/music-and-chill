import './PlayMusic.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEllipsisH} from "@fortawesome/free-solid-svg-icons";
import {useState} from 'react'
function PlayMusic({
    isDisplayedPlayMusic
}){
    const [isLiked,setLiked] = useState(false);


    return (
        <div className='play-music' style={{
            opacity : isDisplayedPlayMusic ? 1 : 0
        }}>
            <div className='play-music__left'>
                <div className='play-music__image'>
                    <h1>Ảnh</h1>
                </div>
                <div className='play-music__description'>
                    <h1 className='play-music__song'>Tên bài hát</h1>
                    <h1 className='play-music__singer'>Tên ca sĩ</h1>
                </div>
                <div className='play-music__option'>
                    <span>
                    <FontAwesomeIcon icon={faHeart} className={`play-music__icon ${isLiked ? 'play-music__icon--active' : ''}`} onClick={() => setLiked(!isLiked)}></FontAwesomeIcon>
                    </span>
                    <span>
                    <FontAwesomeIcon icon={faEllipsisH} className='play-music__icon'></FontAwesomeIcon>
                    </span>
                </div>
            </div>
            <div className='play-music__center'>
                <h1>Center</h1>
            </div>  
            <div className='play-music__right'>
                <h1>Right</h1>
            </div>
        </div>
    )
}

export default PlayMusic;