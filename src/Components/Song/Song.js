import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { getTrackPaginated } from '../../Service/trackService';
import { DEFAULT_GAP } from '../Constants';
import Pagination from '../Pagination/Pagination';
import './Song.css'

export default function Song() {

    const [page, setPage] = useState({});
    const [trackLimit , setTrackLimit] = useState(1);

    useEffect(() => {
        const asyncOperations = async () => {
            const result = await getTrackPaginated(page.number ? page.number + 1 : 1, trackLimit);
            setPage(result);
        }
        asyncOperations();
    }, [trackLimit])

    const colums = [
        {
            name: '',
            selector: track => {
                return (
                    <div className='song-left__wrapper'>
                        <div className='play-music__image-wrapper'>
                                <img src={track.trackThumbnailEncoded} alt='Song thumbnail' className={'play-music__image play-music__image--rectangle play-music__image--hover-effect'} />
                                <div className='overlay'>
                                    <div className='flex-wrapper flex-wrapper--columns'>
                                        <FontAwesomeIcon icon={faEllipsis} className='icon'/>
                                        
                                    </div>
                                </div>
                        </div>
                        <div className='play-music__description'>
                            <h3 className='play-music__song play-music__song--text-black'>{track.trackTitle}</h3>
                            <p className='play-music__singer play-music__singer--text-black'>{track.trackDescription}</p>
                        </div>
                    </div>
                )
            }
        },
        {
            name : '',
            selector : track => {
                return (
                    <p>1000</p>
                )
            }
        }
    ]

    return (
        <div className="song-list">
            <div className='song-list__left'>
                <h2 className='song-list__title'>Top bài hát có lượt view khủng</h2>
                <div className='song-list__hot-songs'>
                    <DataTable columns={colums} data={page.content}/>
                    <div className='total-entries'>
                        {page.numberOfElements} {page.numberOfElements > 1 ? 'tracks' : 'track'} of {page.totalElements} {page.numberOfElements > 1 ? 'tracks' : 'track' }
                    </div>
                    <Pagination currentPage={page.pageable ? page.pageable.pageNumber : null} 
                    setPage={setPage}   
                    gap={DEFAULT_GAP}  
                    setLimit={setTrackLimit}
                    rowLimits={[1,5,10]}          
                    limit={trackLimit}     
                    totalPages={page.totalPages}/>
                </div>
            </div>
            <div className='song-list__right'>

            </div>
        </div>
    )
}