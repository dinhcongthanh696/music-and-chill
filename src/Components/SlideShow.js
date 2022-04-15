import './SlideShow.css';
import {useState , useEffect, useRef} from 'react'
import {SLIDEARRAYS} from './Constants.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight , faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function SlideShow({windowWidth}){
    const [currentSlideIndex,setCurrentSlideIndex] = useState(0);
    const [isFocusedSlide,setFocusedSlide] = useState(false);

    const handleSlideClick = (index) => {
        if(index < 0) index = SLIDEARRAYS.length - 1;
        if(index === SLIDEARRAYS.length) index = 0;
        setCurrentSlideIndex(index);
    }

    const timeoutId = useRef();


    useEffect(() => {
        if(!isFocusedSlide){
            timeoutId.current = setTimeout(() => {
                handleSlideClick(currentSlideIndex + 1);
            },6000)
        }
        return () => {    
            clearTimeout(timeoutId.current);
        }
    },[currentSlideIndex,isFocusedSlide]) 

    return (
        windowWidth > 768 &&
        <div className='slide-show'>
            {
            SLIDEARRAYS.map((slide,index) => {
                return (
                    <div className={index === currentSlideIndex ? "slide-show__item slide-show__item--current" : "slide-show__item" }
                    key={slide.slideCDN}
                    onMouseOver={() => {
                        setCurrentSlideIndex(index);
                        setFocusedSlide(true);
                    }}
                    onMouseOut={() => setFocusedSlide(false)}
                    >
                            <div className='slide-show__image-overlay'></div>
                            <img src={slide.slideCDN} className='slide-show__image'alt='slide' />
                    </div>
                )
                })
            }
            <FontAwesomeIcon icon={faArrowRight} 
                className='slide-show__switch-button slide-show__switch-button--next'
                onClick={() => handleSlideClick(currentSlideIndex + 1)}
                />
            <FontAwesomeIcon icon={faArrowLeft} 
                className='slide-show__switch-button slide-show__switch-button--prev' 
                onClick={() => handleSlideClick(currentSlideIndex - 1)}
                />  
        </div>
    )
}

export default SlideShow;