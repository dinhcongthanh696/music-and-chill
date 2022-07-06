import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import About from './Components/About';
import Playlist from './Components/Playlist';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import ProtectedComponent from './Components/ProtectedComponent';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor } from './Store/store';
import { ABOUT_US_FEATURE_ROLES } from './Components/Constants';
import { Provider } from 'react-redux';
import Settings from './Components/Settings/Settings';
import store from './Store/store';
import AdminLayout from './Components/AdminLayout/AdminLayout';
import Song from './Components/Song/Song';
import { Suspense } from 'react';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} >
        <BrowserRouter>
            <Routes>
                    <Route path='/' element={<App tab="home" />} >
                        <Route path='/about' element={
                            <ProtectedComponent feature={ABOUT_US_FEATURE_ROLES}>  
                                <About />
                            </ProtectedComponent>  
                            }></Route>
                        <Route path='/playlist' element={<Playlist />} ></Route>
                        <Route path='/song' element={
                            <Suspense fallback={<h1>Loading...</h1>}>
                                <Song/>
                            </Suspense>
                        }></Route>
                    </Route>
                    <Route path='/admin' element={
                        <AdminLayout > 
                            <Settings />
                        </AdminLayout>}>
                    </Route>
            </Routes>    
        </BrowserRouter>
    </PersistGate>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
