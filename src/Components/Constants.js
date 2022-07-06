import {faFileImage, faFolder} from "@fortawesome/free-solid-svg-icons";

export const HOME_URL = "/";
export const NAVBARS =[
    {
        title : "Home",
        link : HOME_URL
    },
    {
        title : "About",
        link : "/about"
    },
    {
        
        title : "Playlist",
        link : "/playlist"
    },{
        title : 'Song',
        link : '/song'
    }
];
export const SLIDEARRAYS = [
    {
        slideId : 1,
        slideCDN : 'https://i1.sndcdn.com/artworks-6HpX0P6FNRRylGRy-KYjuvg-t500x500.jpg'
    },
    {
        slideId : 2,
        slideCDN : 'https://i.ytimg.com/vi/9P_sQw9BBuE/maxresdefault.jpg'
    },
    {
        slideId : 3,
        slideCDN : 'https://vtv1.mediacdn.vn/thumb_w/650/2020/7/3/1061332173675372452476431818456362453126714o-1593780823287457624164-crop-1593780866985947628599.jpg'
    },
    {
        slideId : 4,
        slideCDN : 'https://i.scdn.co/image/ab67616d0000b27347cf7b7cafae26a177112d50'
    }
    ]

export const MAX_VOLUME = 1;
export const MIN_VOLUME = 0;

export const THEMES = [
    {
        theme : 'violet-theme',
        description : 'Violet',
        src : 'http://ma-img.lgworld.com/images/themepark/icons/ICON_BG/lg_editmode_tab_bg_28.png'
    },
    {
        theme : 'black-theme',
        description : 'Black',
        src : 'https://www.aavegainteractive.com/wp-content/uploads/2019/07/black-theme-fm8.jpg'
    },
    {
        theme : 'ocean-theme',
        description : 'Ocean',
        src : 'https://shipwrecklog.com/log/wp-content/uploads/2018/03/water-blue-ocean.jpg'
    }
]


export const INTERFACE_MODAL_TITLE = "Giao diện";
export const LOGIN_TITLE = "Đăng nhập";
export const USERNAME_LABEL = "Tên đăng nhập";
export const PASSWORD_LABEL = "Mật khẩu";
export const USERNAME_INVALID_MESSAGE = "Tài khoản không phù hợp";
export const PASSWORD_INVALID_MESSAGE = "Mật khẩu không phù hợp";

// URL
export const ABOUT_US_FEATURE_ROLES = "http://localhost:8080/MusicChill/api/about/roles";
export const FOLDER_TYPE = "application/vnd.google-apps.folder";
export const IMAGE_TYPE = "image/jpg";


// UPLOAD PERCENT TYPE
export const UPLOAD_FOLDER_PERCENT = "uploadFolderPercent";
export const UPLOAD_FILE_PERCENT = "uploadFilePercent";

export const FIRST_PAGE_NUMBER = 0;
export const DEFAULT_GAP = 2;
export const FILE_TYPE_ICON = new Map();
FILE_TYPE_ICON.set(FOLDER_TYPE , { 
    icon : faFolder,
    className : 'icon--yellow' 
});

FILE_TYPE_ICON.set(IMAGE_TYPE ,{
    icon : faFileImage,
    className : 'icon--ocean'
 });
