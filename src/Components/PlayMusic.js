import './PlayMusic.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart , faEllipsisH , faCirclePlay , faCirclePause, faAngleDoubleRight, faAngleDoubleLeft} from "@fortawesome/free-solid-svg-icons";
import {useState , useRef , useEffect} from 'react'
import {MUSICPLAYERFOOTER} from './Constants.js'
function PlayMusic({
    isDisplayedPlayMusic
}){
    const [isLiked,setLiked] = useState(false);
    const [isPLaying,setPlaying] = useState(false);
    const [currentAudioTime,setCurrentAudioTime] = useState(0);
    const seekSliderRef = useRef();

    const handlePlayMusic = () => {
        setPlaying(!isPLaying);
        if(isPLaying){
            audioRef.current.pause();
            clearInterval(musicPlayerInterval.current);
        }else{
            audioRef.current.play();
            musicPlayerInterval.current = setInterval(() => {
                setCurrentAudioTime(prevState => {
                    return parseInt(prevState) + 1;
                });
                seekSliderRef.current.value++;
                seekSliderRef.current.style.background = `linear-gradient(to right, #05d7f7 0% , #05d7f7 ${(seekSliderRef.current.value - seekSliderRef.current.min) / (seekSliderRef.current.max - seekSliderRef.current.min) * 100}% , #fff ${(seekSliderRef.current.value - seekSliderRef.current.min) / (seekSliderRef.current.max - seekSliderRef.current.min) * 100}% , #fff 100%)`;
            },1000);
        }
    }

    const handleTasselsMusic = (time) => {
        var changedtime = parseInt(seekSliderRef.current.value) + time;
        if(changedtime < 0 || changedtime > MUSICPLAYERFOOTER.duration){
            changedtime = 0;
        }
        seekSliderRef.current.value = changedtime;
        audioRef.current.currentTime = changedtime;
        console.log(time);
        seekSliderRef.current.style.background =  `linear-gradient(to right, #05d7f7 0%, #05d7f7 ${(seekSliderRef.current.value - seekSliderRef.current.min) / (seekSliderRef.current.max - seekSliderRef.current.min) * 100}% , #fff ${(seekSliderRef.current.value - seekSliderRef.current.min) / (seekSliderRef.current.max - seekSliderRef.current.min) * 100}% , #fff 100%)`;
        setCurrentAudioTime(changedtime);
    }


    const toRealTime = (timeValue) => {
        const minute = Math.floor(Math.floor(timeValue) / 60);
        const second = (Math.floor(timeValue) - (minute * 60));
        const result = minute + ":" + (second < 10 ? "0"+second : second);
        return result;
    }

    const audioRef = useRef();
    const musicPlayerInterval = useRef();

    useEffect(() => {
        const min = seekSliderRef.current.min;
        const max = seekSliderRef.current.max;
        const value = 0;
        seekSliderRef.current.value = value;
        const breakPoint = (value - min) / (max - min) * 100;
        seekSliderRef.current.style.background = "linear-gradient(to right, #05d7f7 0% , #05d7f7 "+ breakPoint +"% , #fff "+ breakPoint + "% , #fff 100%)";
        seekSliderRef.current.addEventListener("input",() => {
            seekSliderRef.current.style.background = `linear-gradient(to right, #05d7f7 0% , #05d7f7 ${(seekSliderRef.current.value - seekSliderRef.current.min) / (seekSliderRef.current.max - seekSliderRef.current.min) * 100}% , #fff ${(seekSliderRef.current.value - seekSliderRef.current.min) / (seekSliderRef.current.max - seekSliderRef.current.min) * 100}% , #fff 100%)`;
            setCurrentAudioTime(seekSliderRef.current.value);
            audioRef.current.currentTime = seekSliderRef.current.value;
        })
    },[])

    useEffect(() => {
        if(currentAudioTime == MUSICPLAYERFOOTER.duration){
            clearInterval(musicPlayerInterval.current);
            seekSliderRef.current.value = 0;
            seekSliderRef.current.style.background = `linear-gradient(to right, #05d7f7 0% , #05d7f7 ${(0 - seekSliderRef.current.min) / (seekSliderRef.current.max - seekSliderRef.current.min) * 100}% , #fff ${(0 - seekSliderRef.current.min) / (seekSliderRef.current.max - seekSliderRef.current.min) * 100}% , #fff 100%)`;
            setCurrentAudioTime(0);
            setPlaying(false);
        }
    },[currentAudioTime])

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
                <audio ref={audioRef}>
                    <source type='audio/mpeg' src='./images/tinh-da-day-mot-tim.mp3'></source>
                </audio>
                <div className='play-music__controls'>
                    <FontAwesomeIcon icon={faAngleDoubleLeft} className='play-music__icon' onClick={() => handleTasselsMusic(-15)}></FontAwesomeIcon>
                    <FontAwesomeIcon 
                    icon={isPLaying ? faCirclePause : faCirclePlay} 
                    className='play-music__icon play-music__icon--size-s' 
                    onClick={handlePlayMusic}>
                    </FontAwesomeIcon>
                    <FontAwesomeIcon icon={faAngleDoubleRight} className='play-music__icon' onClick={() => handleTasselsMusic(15)}></FontAwesomeIcon>
                </div>
                <div className='play-music__seeker'>
                    <span className='play-music__time'>{toRealTime(currentAudioTime)}</span>
                    <input type='range' className='play-music__slider' min='0' max={MUSICPLAYERFOOTER.duration} ref={seekSliderRef}/>
                    <span className='play-music__time'>{toRealTime(MUSICPLAYERFOOTER.duration - currentAudioTime)}</span>
                </div>
            </div>  
            <div className='play-music__right'>
                <h1>Right</h1>
            </div>
        </div>
    )
}

export default PlayMusic;