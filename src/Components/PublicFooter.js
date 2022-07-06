import './PublicFooter.css'
import {memo} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useContext } from 'react';
import { ThemeContext } from '../Context/ThemeContext';
function PublicFooter(){
    const themeValue = useContext(ThemeContext); 
    return(
        <footer className={`footer ${themeValue.theme}`}>
            <div className='footer__inner'>
                <div className='footer__left'>
                    <div className='footer__playlist'>
                        <h1 className='footer__heading'>
                            Playlist
                        </h1>
                        <ul className='footer__playlist-left'>
                            <li className='play-list__item'><FontAwesomeIcon icon={faArrowRight} className='footer-item__icon'/>Lofi Music Việt Nam</li>
                            <li className='play-list__item'><FontAwesomeIcon icon={faArrowRight} className='footer-item__icon'/>Cukak</li>
                            <li className='play-list__item'><FontAwesomeIcon icon={faArrowRight} className='footer-item__icon'/>Tuyển tập bài hát hay nhất của Sơn Tùng MTP</li>
                        </ul>
                        <ul className='footer__playlist-right'>
                            <li className='play-list__item'><FontAwesomeIcon icon={faArrowRight} className='footer-item__icon'/>Nhạc 8x 9x acoustic</li>
                            <li className='play-list__item'><FontAwesomeIcon icon={faArrowRight} className='footer-item__icon'/>Concert 25 - Hoàng Dũng</li>
                        </ul>    
                    </div>
                    <div className='footer__songs'>
                        <h1 className='footer__heading'>
                            Danh sách nhạc                        
                        </h1>
                        <ul className='footer__songs-left'>
                            <li className='song__item'><FontAwesomeIcon icon={faArrowRight} className='footer-item__icon'/>Có chắc yêu là đây</li>
                            <li className='song__item'><FontAwesomeIcon icon={faArrowRight} className='footer-item__icon'/>Tình đã đầy một tim</li>
                            <li className='song__item'><FontAwesomeIcon icon={faArrowRight} className='footer-item__icon'/>Chờ anh nhé</li>
                        </ul>
                        <ul className='footer__songs-right'>
                            <li className='song__item'><FontAwesomeIcon icon={faArrowRight} className='footer-item__icon'/>Lần hẹn hò đầu tiên</li>
                            <li className='song__item'><FontAwesomeIcon icon={faArrowRight} className='footer-item__icon'/>Your Smile - Obito ft .hnhngan</li>
                        </ul> 
                    </div>
                </div>
                <div className='footer__right'>
                    <div className='footer__top-search'>
                        <h1 className='footer__heading'>
                            Top từ khóa
                        </h1>
                        <div className='footer__top-search-body'>
                            <a className='footer__key-word'>Yêu đương khó quá thì chạy về khóc với anh ,</a>
                            <a className='footer__key-word'>Người nói sẽ yêu anh mãi đậm sâu ,</a>
                            <a className='footer__key-word'>See tình ,</a>
                            <a className='footer__key-word'>Tell you mom ,</a>
                            <a className='footer__key-word'>Mới chỉ nhìn em khóc</a>
                        </div>
                    </div>
                    <div className='footer__social-media'>
                        <h1 className='footer__heading'>
                            Kết nối với chúng tôi
                        </h1>
                        <div className='footer__social-media-body'>
                            <a href='https://www.facebook.com/onepiecefigtting/' target='_blank'>
                            <img className='social-media-image' alt='facebook' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/800px-Facebook_f_logo_%282019%29.svg.png'/>
                            </a>
                            <a href='https://www.instagram.com/dinhcongthanh1234/' target='_blank'>
                            <img className='social-media-image' alt='instagram' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png'/>
                            </a>
                            <a href='https://www.instagram.com/dinhcongthanh1234/' target='_blank'>
                            <img className='social-media-image' alt='zalo' src='https://seeklogo.com/images/Z/zalo-logo-B0A0B2B326-seeklogo.com.png'/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default memo(PublicFooter);