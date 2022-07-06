import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { getTrackPaginated } from '../../Service/trackService';
import { FIRST_PAGE_NUMBER } from '../Constants';
import './Pagination.css'
export default function Pagination({ currentPage, totalPages, setPage, gap , rowLimits , setLimit , limit}) {
    const pageNumbers = [];
    let indexPageRemaningLeft = null;
    let indexPageRemainingRight = null;

    for (let i = 0; i < currentPage; i++) {
        if (i === FIRST_PAGE_NUMBER ||
            i + gap >= currentPage
        ) {
            pageNumbers.push(i + 1);
        } else {
            indexPageRemaningLeft = i + 1;
        }
    }

    for (let i = currentPage; i < totalPages; i++) {
        if (i === totalPages - 1 ||
            currentPage + gap >= i
        ) {
            pageNumbers.push(i + 1);
        } else if (!indexPageRemainingRight) {
            indexPageRemainingRight = i - 1;
        }
    }

    const handleChangePage = (page , limit) => {
        const asyncOperations = async () => {
            const result = await getTrackPaginated(page, limit); // 1 is fixed ---> need to be fix in the future
            setPage(result);
        }
        asyncOperations();
    }


    const handleChangeLimit = (newLimit) => {
        setLimit(newLimit);
        handleChangePage(FIRST_PAGE_NUMBER + 1, newLimit);
    }


    return (
        <div className='pages-wrapper'>
            <select onChange={(event) => handleChangeLimit(event.target.value)}>
                {rowLimits.map(rowLimit => {
                    return (
                        <option key={rowLimit}>{rowLimit}</option>
                    )
                })}
            </select>
            {currentPage !== FIRST_PAGE_NUMBER
                ? <span className="page-item clickable" onClick={() => handleChangePage(currentPage , limit)}>
                    <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                </span>
                : ''
            }
            {pageNumbers.map((page, index) => {
                return (
                    <React.Fragment key={index}>
                        {indexPageRemaningLeft == page - 1 ? <span className='page-item'>...</span> : ''}
                        <span className={`page-item clickable ${currentPage === (page - 1) ? 'active' : ''}`}
                            key={page}
                            onClick={() => handleChangePage(page , limit)}
                        >{page}</span>
                        {indexPageRemainingRight == page - 1 ? <span className='page-item'>...</span> : ''}
                    </React.Fragment>
                )
            })}
            {(currentPage + 1) !== totalPages
                ? <span className="page-item clickable" onClick={() => handleChangePage(currentPage + 2 , limit)}>
                    <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                </span>
                : ''
            }
        </div>
    )
}