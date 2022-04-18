import './App.css';
import PublicHeader from './Components/PublicHeader.js'
import SlideShow from './Components/SlideShow';
import { Outlet } from "react-router-dom";
import { useEffect , useState} from 'react'
import PublicFooter from './Components/PublicFooter';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp , faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import ToastMessages from './Components/ToastMessages';
import PlayMusic from './Components/PlayMusic';
import Modal from './Components/Modal';

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isDisplayedGototop,setDislayedGototop] = useState(false);
  const [isDisplayedPlayMusic,setDisplayedPlayMusic] = useState(() => {
      return localStorage.getItem("is-displayed-play-music") === "show";
  });

  useEffect(() => {
    const handleResizeScreen = () => {
      setWindowWidth(window.innerWidth);
    }
    const handleScroll = () => {
        setDislayedGototop(window.scrollY > 315);
    }

      window.addEventListener("scroll",handleScroll);
      window.addEventListener("resize", handleResizeScreen);
    return () => {
      window.removeEventListener("resize", handleResizeScreen);
      window.removeEventListener("scroll",handleScroll);
    }
  }, [])


  return (
    <div className="App">
      <PlayMusic isDisplayedPlayMusic={isDisplayedPlayMusic} />
      <a href='#top'></a>
      <PublicHeader windowWidth={windowWidth}/>
    
      <SlideShow windowWidth={windowWidth}/>
      <Outlet />
      <PublicFooter/>
        <div className='go-to-top' style={{opacity : isDisplayedGototop ? 1 : 0}}>
          <a href='#top'> <FontAwesomeIcon icon={faArrowUp} /> GO TO TOP </a>
        </div> 
    </div>
  );
}

export default App;
