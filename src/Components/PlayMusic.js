import './PlayMusic.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart , faEllipsisH , faCirclePlay , faCirclePause} from "@fortawesome/free-solid-svg-icons";
import {useState} from 'react'
import {MUSICPLAYERFOOTER} from './Constants.js'
function PlayMusic({
    isDisplayedPlayMusic
}){
    const [isLiked,setLiked] = useState(false);
    const [isPLaying,setPlaying] = useState(false);

    return (
        <div className='play-music' style={{
            opacity : isDisplayedPlayMusic ? 1 : 0
        }}>
            <div className='play-music__left'>
                <div className='play-music__image-wrapper'>
                    <img src={MUSICPLAYERFOOTER.thumbnailCDN} alt='Song thumbnail' className={`play-music__image ${isPLaying ? 'play-music__image--playing' : ''}`}/>
                </div>
                <div className='play-music__description'>
                    <h3 className='play-music__song'>{MUSICPLAYERFOOTER.songName}</h3>
                    <p className='play-music__singer'>{MUSICPLAYERFOOTER.artist}</p>
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
                <FontAwesomeIcon icon={isPLaying ? faCirclePause : faCirclePlay} className='play-music__icon play-music__icon--size-s' onClick={() => setPlaying(!isPLaying)}></FontAwesomeIcon>
            </div>  
            <div className='play-music__right'>
                <h1>Right</h1>
            </div>
        </div>
    )
}

export default PlayMusic;