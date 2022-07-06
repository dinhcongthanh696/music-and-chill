import './PublicHeader.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch , faBars , faXmark , faShare , faRainbow} from "@fortawesome/free-solid-svg-icons";
import {useState , useEffect , useRef, Suspense , startTransition , useContext} from 'react'
import { topKeyWordPromise , addKeyWordPromise } from '../Service/keyWordService';
import {Link} from 'react-router-dom';
import  store from "../Store/store";
import { logout, resetFilesState , resetFeatureState} from "../Action/Actions";
import { queryArtistAndTrackPromise } from '../Service/commonService';
import { ThemeContext } from '../Context/ThemeContext';
import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { selectCurrentNavIndex  , selectNavbars} from '../Slice/featureSlice';
import { navigating } from '../Action/Actions';
function PublicHeader({ windowWidth ,
     setDisplayedThemeSelectionModal ,
     setDisplayedFormLogin , 
     setAuthenticated , 
     isAuthenticated }){
    const [query,setQuery] = useState("");
    const [isTriggeredMobileNavbar,setTriggeredMobileNavbar] = useState(false);
    const [isDisplayedRecommendation , setDisplayedRecommendation] = useState(false);
    const [searchItems , setSerachItems] = useState();
    const [keywords , setKeyWords] = useState([]);
    const themeValue = useContext(ThemeContext);
    const currentNavbarIndex = useSelector(selectCurrentNavIndex);
    const navbars = useSelector(selectNavbars);
    const dispatcher = useDispatch();
    const currentUser = store.getState().userReducer.currentUser;
    const inputRef = useRef();
    const historyRef = useRef();
    const buttonSearchRef = useRef();

    const handleMobileNavIconClick = (isTriggered) => {
        setTriggeredMobileNavbar(isTriggered);
    }

    const handleQuery = (inputValue) => {
        setQuery(inputValue);
        startTransition(() => {
            queryArtistAndTrackPromise(inputValue).then(searchItems => {
                setSerachItems(searchItems);
            })
        })
    }

    const handleNavbarClick = (index) => {
        dispatcher(navigating(index));
    }

    const logoutHandle = (event) => {
        event.preventDefault();
        store.dispatch(logout());
        setAuthenticated(false);
    }

    const handleSearchFocus = (isFocused) => {
        setDisplayedRecommendation(isFocused);
    }

    const handleCompleInputField = (value) => {
        setQuery(value);
    }

    const loginFormTriggerHandle = (event) => {
        event.preventDefault();
        setDisplayedFormLogin(true);
    }

    const handleSearch = () => {
        addKeyWordPromise(query);
    }

    useEffect(() => {
        const handleClick = (event) => {
            if(event.target !== inputRef.current && 
                event.target !== historyRef.current && 
                ! historyRef.current.contains(event.target) && 
                ! buttonSearchRef.current.contains(event.target)){
                    setDisplayedRecommendation(false);
                }
        }

        topKeyWordPromise().then(keywords => {
            setKeyWords(keywords);
        })

        window.addEventListener("click",handleClick);
        return () => {
             window.removeEventListener("click",handleClick);
        }
    },[])


    useEffect(() => {
        if(windowWidth > 768){
            setTriggeredMobileNavbar(false);
        }
    },[windowWidth])

    return (
        <div className={isTriggeredMobileNavbar ? `header header--mobile ${themeValue.theme}` : `header ${themeValue.theme}`}>
            <div className='header-top-wrapper'>
                <div className='header__logo'>
                    <img className='header__logo-img' src='images/header-logo.jpg' />
                </div>
                <div className='header__search'>
                    <input className='header__search-input' type='text' 
                           placeholder='Search...' ref={inputRef} 
                           value={query} onChange={(event) => handleQuery(event.target.value)} 
                           onFocus={() => handleSearchFocus(true)}/>
                    <button className={`header__search-button btn btn-primary ${themeValue.theme}`} onClick={handleSearch} ref={buttonSearchRef}>
                        <FontAwesomeIcon icon={faSearch} /> 
                    </button>
                    {   isDisplayedRecommendation &&
                        query.trim().length !== 0 && 
                        <FontAwesomeIcon 
                            icon={faXmark} 
                            className="header__search-clear-icon"
                            onClick={() => setQuery('')} 
                        />
                    }
                    <div className='header__search-keywords' style={{display : isDisplayedRecommendation && query.length === 0 ? 'block' : 'none'}}>
                        <div className='header__history-heading'>Tìm kiếm nhiều nhất</div>
                        <ul className='header__history-list'>
                            {keywords.map((keyword , index) => {
                                return (
                                    <li className='header__history-item' key={index}>
                                        <div className='history-item__left'>
                                             <FontAwesomeIcon icon={faShare} className='header__search-icon'/>
                                        </div>
                                        <div className='history-item__right'>
                                            <div className='history-search-word'>{keyword.keyWordId.keyword}</div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className='header__search-history' style={{display : (isDisplayedRecommendation && query.length !== 0) ? 'block' : 'none'}} 
                         ref={historyRef} >
                        <div className='header__history-heading'>Gợi ý kết quả </div>
                        <ul className='header__history-list'>
                            {searchItems && searchItems.map( (searchItem , index) => {
                                return(
                                    <li className='header__history-item' key={index}>
                                        <div className='history-item__left'>
                                            <img src={searchItem.imageBase64Encode} className='history-item__image'/>
                                        </div>
                                        <div className='history-item__right'>
                                            <div className='history-item__title'>{searchItem.title}</div>
                                            <div className='history-item__description'>{searchItem.description}</div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>  
                    </div>
                    <nav className='header__nav'>
                        {navbars.map((bar,index) => {
                            return (
                                <li key={index} className='nav-item'>
                                    <Link to={bar.link}
                                    className={`nav-link ${index === currentNavbarIndex ? 'active-nav-link' : '' }` }
                                    onClick={() => handleNavbarClick(index)}> 
                                            {bar.title}
                                    </Link>
                                    <div className='header__menu'>Menu</div>
                                </li>
                                
                            )
                        })}
                    </nav>
                </div>
                <div className='header__options'>
                        <FontAwesomeIcon icon={faRainbow} className='icon' title='Thay đổi theme' onClick={() => setDisplayedThemeSelectionModal(true)}/>
                        
                </div>
                <div className='header__authentication'>
                    {isAuthenticated ? <span className='header__authentication-link'> Hello {currentUser.username} </span> : 
                    <a href="#" className='header__authentication-link'>Đăng ký</a>}
                    {isAuthenticated ? <a href ="#" className='header__authentication-link' onClick={logoutHandle}>Đăng xuất</a> : 
                    <a href ="#" className='header__authentication-link' onClick={loginFormTriggerHandle}>Đăng nhập</a>
                    }
                </div>
                <div className='header__mobile-nav'>
                    <FontAwesomeIcon icon={isTriggeredMobileNavbar ? faXmark : faBars} 
                        className="header__mobile-nav-icon"
                        onClick={() => handleMobileNavIconClick(!isTriggeredMobileNavbar)}></FontAwesomeIcon>
                </div>
                <div className='header__mobile-nav-list' style={{display : (isTriggeredMobileNavbar) ? 'block' : 'none'}} >
                    <nav className='header__mobile__nav'>
                        {navbars.map((bar,index) => {
                                return (
                                    <li key={index}>
                                        <Link to={bar.link}
                                        className={`nav-link ${index === currentNavbarIndex ? 'active-nav-link' : '' }` }
                                        onClick={() => handleNavbarClick(index)}> 
                                                {bar.title}
                                        </Link>
                                        
                                    </li>
                                    
                                )
                            })}
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default PublicHeader;