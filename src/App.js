import './App.css';
import PublicHeader from './Components/PublicHeader.js'
import SlideShow from './Components/SlideShow';
import { Outlet } from "react-router-dom";
import { useEffect , useState } from 'react'
import PublicFooter from './Components/PublicFooter';
import PlayMusic from './Components/PlayMusic';
import GoToTop from './Components/GoToTop';
import { ThemeContextProvider } from './Context/ThemeContext';
import ThemeSelection from './Components/ThemeSelection.js';
import Modal from './Components/Modal.js';
import LoginForm from './Components/LoginForm';
import { INTERFACE_MODAL_TITLE , LOGIN_TITLE } from './Components/Constants';
import store from './Store/store';
import { useDispatch } from 'react-redux';
import { resetFeatureState } from './Action/Actions';
import PlayList from './Components/PlayList/PlayList';
function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isDisplayedGototop,setDislayedGototop] = useState(false);
  const [isAuthenticated , setAuthenticated] = useState(() => {
      const currentUser = store.getState().userReducer.currentUser;
      return currentUser && typeof currentUser.username !== 'undefined'; 
  });
  const dispatcher = useDispatch();
  const [isDisplayedThemeSelectionModal , setDisplayedThemeSelectionModal] = useState(false);
  const [isDisplayedFormLogin , setDisplayedFormLogin] = useState(false);
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
      dispatcher(resetFeatureState());
    return () => {
      window.removeEventListener("resize", handleResizeScreen);
      window.removeEventListener("scroll",handleScroll);
    }
  }, [])

  return (
    <ThemeContextProvider>
      <div className="App">
        <PlayList />
        {isDisplayedThemeSelectionModal ? 
        <Modal heading={INTERFACE_MODAL_TITLE} setDisPlayModal={setDisplayedThemeSelectionModal}>
            <ThemeSelection/>
        </Modal> : ''}
        {
          isDisplayedFormLogin ? 
          <Modal heading={LOGIN_TITLE} setDisPlayModal={setDisplayedFormLogin}>
              <LoginForm setDisplayedFormLogin={setDisplayedFormLogin} setAuthenticated={setAuthenticated}/>
          </Modal> : ''
        }

        <PlayMusic isDisplayedPlayMusic={isDisplayedPlayMusic} />
        <a href='#top'></a>
        <PublicHeader windowWidth={windowWidth} setDisplayedThemeSelectionModal={setDisplayedThemeSelectionModal} 
          setDisplayedFormLogin={setDisplayedFormLogin} setAuthenticated={setAuthenticated} isAuthenticated={isAuthenticated}
        />
        <PlayMusic/>
        <SlideShow windowWidth={windowWidth}/>
        <Outlet />
        <GoToTop isDisplayedGototop={isDisplayedGototop} />
        <PublicFooter/>
      </div>
    </ThemeContextProvider>
  );
}

export default App;
