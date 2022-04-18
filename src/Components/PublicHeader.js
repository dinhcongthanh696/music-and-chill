import './PublicHeader.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch , faBars , faXmark} from "@fortawesome/free-solid-svg-icons";
import {useState , useEffect , useRef} from 'react'
import {NAVBARS , HISTORYSEARCHITEMSIZE} from './Constants.js';
import {Link} from 'react-router-dom'
function PublicHeader({windowWidth}){
    const [query,setQuery] = useState("");
    const [isTriggeredMobileNavbar,setTriggeredMobileNavbar] = useState(false);
    const [isDisplayedHistory , setDisplayedHistory] = useState(false);
    const [currentNavBar, setCurrentNavBar] = useState(0);
    const [historySearch,setHistorySearch] = useState(() => {
        const historySearchesRawString = localStorage.getItem("history-searches");
        const historySearchsArray = JSON.parse(historySearchesRawString);
        if(!Array.isArray(historySearchsArray)) return [];
        return historySearchsArray;
    })
    const inputRef = useRef();
    const historyRef = useRef();
    const buttonSearchRef = useRef();

    const handleRemoveHistory = (index) => {
        const newHistory = historySearch.filter((search,searchIndex) => {
            return searchIndex !== index;
        });
        setHistorySearch(newHistory);
        localStorage.setItem("history-searches",JSON.stringify(newHistory));
    }

    const handleMobileNavIconClick = (isTriggered) => {
        setTriggeredMobileNavbar(isTriggered);
    }

    const handleQuery = (inputValue) => {
        setQuery(inputValue);
    }

    const handleSearchFocus = (isFocused) => {
        setDisplayedHistory(isFocused);
    }

    const handleCompleInputField = (value) => {
        setQuery(value);
        setDisplayedHistory(false);
    }

    const handleSearch = () => {
        const query = inputRef.current.value;
        var isDuplicated = false;
        for(let i = 0 ; i < historySearch.length ; i++){
            if(historySearch[i] === query.trim()){
                isDuplicated = true;
            }
        }
        var newHistory = [
            ...historySearch
        ];
        if(!isDuplicated){
            newHistory.push(query.trim());
        }

        if(newHistory.length > HISTORYSEARCHITEMSIZE) {
            const overSizedHistory = newHistory.slice(1,newHistory.length);
            newHistory = overSizedHistory; 
            console.log(newHistory);
        }
        setHistorySearch(newHistory)
        inputRef.current.focus();
        setQuery("");
        localStorage.setItem("history-searches",JSON.stringify(newHistory));
    }

    useEffect(() => {
        const handleClick = (event) => {
            if(event.target !== inputRef.current && 
                event.target !== historyRef.current && 
                ! historyRef.current.contains(event.target) && 
                ! buttonSearchRef.current.contains(event.target)){
                    setDisplayedHistory(false);
                }
        }

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
        <div className={isTriggeredMobileNavbar ? 'header header--mobile' : 'header'}>
            <div className='header-top-wrapper'>
                <div className='header__logo'>
                    <img className='header__logo-img' src='images/header-logo.jpg' />
                </div>
                <div className='header__search'>
                    <input className='header__search-input' type='text' 
                           placeholder='Search...' ref={inputRef} 
                           value={query} onChange={(event) => handleQuery(event.target.value)} 
                           onFocus={() => handleSearchFocus(true)}/>
                    <button className='header__search-button btn btn-primary' onClick={handleSearch} ref={buttonSearchRef}>
                        <FontAwesomeIcon icon={faSearch} /> 
                    </button>
                    {   isDisplayedHistory &&
                        query.trim().length !== 0 && 
                        <FontAwesomeIcon 
                            icon={faXmark} 
                            className="header__search-clear-icon"
                            onClick={() => setQuery('')} 
                        />
                    }
                    <div className='header__search-history' style={{display : (isDisplayedHistory) ? 'block' : 'none'}} 
                         ref={historyRef} >
                        <div className='header__history-heading'>Lịch sử tìm kiếm</div>
                        <div className='header__history-body'>
                            <ul className='header__history-list'>
                                {historySearch.map((history,index) => {
                                    return (
                                        <li key={index} style={{display : (history.trim().includes(query.trim()) ? 'list-item' : 'none')}} 
                                        className="header__history-item"
                                        onClick={() => handleCompleInputField(history)}
                                        >
                                            {history}
                                            <FontAwesomeIcon icon={faXmark} className="header__history-close-icon" 
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    handleRemoveHistory(index);
                                                }}
                                            />
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <nav className='header__nav'>
                        {NAVBARS.map((bar,index) => {
                            return (
                                <li key={index} className='nav-item'>
                                    <Link to={bar.link}
                                    className={`nav-link ${window.location.pathname === bar.link ? 'active-nav-link' : '' }` }
                                    onClick={() => setCurrentNavBar(index)}> 
                                            {bar.title}
                                    </Link>
                                    <div className='header__menu'>Menu</div>
                                </li>
                                
                            )
                        })}
                    </nav>
                </div>
                <div className='header__authentication'>
                    <a href="#" className='header__authentication-link'>Đăng ký</a>
                    <a href ="#" className='header__authentication-link'>Đăng nhập</a>
                </div>
                <div className='header__mobile-nav'>
                    <FontAwesomeIcon icon={isTriggeredMobileNavbar ? faXmark : faBars} 
                        className="header__mobile-nav-icon"
                        onClick={() => handleMobileNavIconClick(!isTriggeredMobileNavbar)}></FontAwesomeIcon>
                </div>
                <div className='header__mobile-nav-list' style={{display : (isTriggeredMobileNavbar) ? 'block' : 'none'}} >
                    <nav className='header__mobile__nav'>
                        {NAVBARS.map((bar,index) => {
                                return (
                                    <li key={index}>
                                        <Link to={bar.link}
                                        className={`nav-link ${window.location.pathname === bar.link ? 'active-nav-link' : '' }` }
                                        onClick={() => setCurrentNavBar(index)}> 
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