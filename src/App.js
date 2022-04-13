import './App.css';
import PublicHeader from './Components/PublicHeader.js'
import SlideShow from './Components/SlideShow';
import { Outlet } from "react-router-dom";
import { useEffect , useState} from 'react'
import PublicFooter from './Components/PublicFooter';

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResizeScreen = () => {
      setWindowWidth(window.innerWidth);
    }
      window.addEventListener("resize", handleResizeScreen);
    return () => {
      window.removeEventListener("resize", handleResizeScreen);
    }
  }, [])

  return (
    <div className="App">
      <PublicHeader windowWidth={windowWidth}/>
      <SlideShow windowWidth={windowWidth}/>
      <Outlet />
      <PublicFooter/>
    </div>
  );
}

export default App;
