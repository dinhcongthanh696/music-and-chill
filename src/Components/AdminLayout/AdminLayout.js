import './AdminLayout.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut , faBarChart , faCog , faBars} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
export default function AdminLayout({children}){
    const [isToggleBar , setToggleBar] = useState(true);

    return (
        <div className="admin-layout">
            <div className='toggle-bar'>
                <FontAwesomeIcon icon={faBars} className='icon icon--ocean icon--size-l' onClick={() => setToggleBar(!isToggleBar)}/>
            </div>
            <div className={`admin-layout__left ${!isToggleBar ? 'admin-layout__left--hide' : ''}`}>
                <div className='admin-layout__left__top'>
                    <img className='admin-profile' 
                    src='https://nntheblog.b-cdn.net/wp-content/uploads/2022/02/mikey-wallpaper-tokyo-revengers-3.jpg'
                    alt='Admin '/>
                </div>
                <div className='admin-layout__left__center'>
                    <div className='admin-navigation'>
                        <FontAwesomeIcon icon={faBarChart} className='icon icon--ocean'/>
                        <FontAwesomeIcon icon={faCog} className='icon icon--ocean'/>
                    </div>
                </div>
                <div className='admin-layout__left__bottom'>
                    <div className='admin-sign-out'>
                        <FontAwesomeIcon icon={faSignOut} className='icon icon--ocean'/>
                    </div>
                </div>
            </div>
            <div className='admin-layout__center'>{children}</div>
        </div>
    )
}