import './PlayMusic.css'

function PlayMusic({
    isDisplayedPlayMusic
}){
    return (
        <div className='play-music' style={{
            display : isDisplayedPlayMusic ? 'block' : 'none'
        }}>
            <h1>Play Music</h1>
        </div>
    )
}

export default PlayMusic;