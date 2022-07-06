import './PlayMusic.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart , faEllipsisH , faCirclePlay , 
    faCirclePause, faAngleDoubleRight, faAngleDoubleLeft ,
    faVolumeUp
} from "@fortawesome/free-solid-svg-icons";
import { getTrackPromise } from '../Service/trackService';
import {useState , useRef , useEffect , useContext} from 'react'
import { MAX_VOLUME , MIN_VOLUME} from './Constants.js'
import {updateSeekControlValue , updateSeekControlBackGround} from './PlayMusicService'
import { ThemeContext } from '../Context/ThemeContext';
function PlayMusic(){
    const [isLiked,setLiked] = useState(false);
    const [isPLaying,setPlaying] = useState(false);
    const [currentAudioTime,setCurrentAudioTime] = useState(0);
    const [playingTrack,setPlayingTrack] = useState();
    const seekSliderRef = useRef();
    const volumeSliderRef = useRef();
    const audioRef = useRef();
    const musicPlayerInterval = useRef();
    const themeValue = useContext(ThemeContext);

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
                updateSeekControlValue(seekSliderRef.current,parseInt(seekSliderRef.current.value) + 1);
                updateSeekControlBackGround(seekSliderRef.current,'#05d7f7');
            },1000);
        }
    }

    const handleTasselsMusic = (time) => {
        var changedtime = parseInt(seekSliderRef.current.value) + time;
        if(changedtime < 0 || changedtime > 0){
            changedtime = 0;
        }
        timingEffects(changedtime);
    }


    const toRealTime = (timeValue) => {
        const minute = Math.floor(Math.floor(timeValue) / 60);
        const second = (Math.floor(timeValue) - (minute * 60));
        const result = minute + ":" + (second < 10 ? "0"+second : second);
        return result;
    }

    const timingEffects = (time) => {
        audioRef.current.currentTime = time;
        updateSeekControlValue(seekSliderRef.current,time);
        updateSeekControlBackGround(seekSliderRef.current,'#05d7f7');
        setCurrentAudioTime(time);
    }

    useEffect(() => {
        updateSeekControlValue(seekSliderRef.current , 0);
        updateSeekControlValue(volumeSliderRef.current,MAX_VOLUME);
        updateSeekControlBackGround(seekSliderRef.current,'#05d7f7');
        updateSeekControlBackGround(volumeSliderRef.current , '#0afab2');
        seekSliderRef.current.addEventListener("input",() => {
            updateSeekControlBackGround(seekSliderRef.current,'#05d7f7');
            setCurrentAudioTime(seekSliderRef.current.value);
            audioRef.current.currentTime = seekSliderRef.current.value;
        })
        volumeSliderRef.current.addEventListener('input',() => {
            updateSeekControlBackGround(volumeSliderRef.current , '#0afab2');
            audioRef.current.volume = volumeSliderRef.current.value;
        })
        
    },[])

    useEffect(() => {
        if(currentAudioTime == 0){
            clearInterval(musicPlayerInterval.current);
            updateSeekControlValue(seekSliderRef.current,0);
            setCurrentAudioTime(0);
            setPlaying(false);
        }
    },[currentAudioTime])

    return (
        <div className={`play-music ${themeValue.theme}`}>
            <div className='play-music__left'>
                <div className='play-music__image-wrapper'>
                    <img src={''} alt='Song thumbnail' className={`play-music__image ${isPLaying ? 'play-music__image--playing' : ''}`}/>
                </div>
                <div className='play-music__description'>
                    <h3 className='play-music__song'>{''}</h3>
                    <p className='play-music__singer'>{''}</p>
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
                    <source type='audio/mpeg' src={playingTrack ? playingTrack.preview_url : ''}></source>
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
                    <input type='range' className='play-music__slider' min='0' max={playingTrack ? playingTrack.duration_ms / 1000 : 5} ref={seekSliderRef}/>
                    <span className='play-music__time'>{toRealTime((playingTrack ? playingTrack.duration_ms / 1000 : 0) - currentAudioTime)}</span>
                </div>
            </div>  
            <div className='play-music__right'>
                <div className='play-music__volume'>
                    <FontAwesomeIcon icon={faVolumeUp} className="play-music__icon"></FontAwesomeIcon>
                    <input type='range' className='play-music__volume-control play-music__slider play-music__slider--size-s' 
                    min={MIN_VOLUME} max={MAX_VOLUME} step={0.1} ref={volumeSliderRef}/>
                </div>
            </div>
        </div>
    )
}

export default PlayMusic;