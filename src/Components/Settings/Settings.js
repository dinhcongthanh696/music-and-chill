import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faUpload , faEdit , faTrash, faSave, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import './Settings.css'
import React, { useRef, useState } from 'react'
import {ProgressBar} from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import { selectContextFolder, selectCreateFolderPercent, selectFiles, selectRootFolder, selectUploadFilePercent } from '../../Slice/fileSelectores'
import { changeFolderContext, createNewFolder, deleteFolder, updateFolder, uploadFile } from '../../Action/Actions'
import { FILE_TYPE_ICON} from '../Constants'
export default function Settings(){
    const filesData = useSelector(selectFiles);
    const loadingFilePercent = useSelector(selectUploadFilePercent);
    const loadingFolderPercent = useSelector(selectCreateFolderPercent);
    const contextFolder = useSelector(selectContextFolder);
    const rootFolder = useSelector(selectRootFolder);
    const dispatcher = useDispatch();
    const [edittedFileId , setEdittedFileId] = useState(0);
    const [edittedFileName , setEdittedFileName] = useState('');

    const fileColumns = [
        {
            name: 'Type',
            selector: row => {
               return (
                    <p><FontAwesomeIcon icon={FILE_TYPE_ICON.get(row.type).icon} className={FILE_TYPE_ICON.get(row.type).className}/></p>
                    ) 
            }
        },
        {
            name : 'ID' , 
            selector: row => row.id
        }
        ,
        {
            name: 'File Name',
            selector: row => {
                return row.id === edittedFileId ? <input type="text" onChange={(event) => setEdittedFileName(event.target.value)}/> 
                : row.isClickable === "true" ? <p className='clickable' onClick={() => updateFolderContext(row.id)}>{row.name}</p> : row.name
            },
        },
        {
            name : 'Edit',
            selector : row => {
                return (
                    row.id === edittedFileId 
                    ? <FontAwesomeIcon icon={faSave} className='icon icon--ocean' onClick={() => handleSaveFileName(row.id)}/>
                    : <FontAwesomeIcon icon={faEdit} className='icon icon--ocean' onClick={() => handleEditFile(row.id)}/>
                )
            }
        },
        {
            name : 'Delete',
            selector : row => {
                return (
                    <FontAwesomeIcon icon={faTrash} className='icon icon--ocean' onClick={() => handleDeleteFile(row.id)}/>
                )
            }
        }
    ];

    const handleSaveFileName = (id) => {
        dispatcher(updateFolder(id,edittedFileName));
        setEdittedFileName('');
        setEdittedFileId(0);
    }

    const updateFolderContext = (id) => {
        dispatcher(changeFolderContext(id));
    }

    const handleEditFile = (id) => {
        setEdittedFileId(id);
        setEdittedFileName('');
    }

    const handleUpload = () => {
         const fileInputElmenet = fileRef.current;
         const file = fileInputElmenet.files[0];
         if(file){
            dispatcher(uploadFile(file));
            fileRef.current.value = null;
            return;
         } 
         fileRef.current.click(); // open modallog for use to choosing file
    }

    const handleDeleteFile = (id) => {
        dispatcher(deleteFolder(id));
    }

    const handleAddNewFolder = () => {
        dispatcher(createNewFolder());
    }
    const fileRef = useRef();
    return (
        <div className="settings">
            <div className='folder-chaining'>
                    {contextFolder.parentFolders && contextFolder.parentFolders.map((folder,index) => {
                        return <React.Fragment key={index}> 
                                <span className='clickable' onClick={() => updateFolderContext(folder.id)}>{`${folder.name.toUpperCase()}`}</span>
                                <FontAwesomeIcon icon={faArrowRight} className='chain'/>
                            </React.Fragment>
                    })}
                    { contextFolder !== null 
                       ? <span className='active'>{contextFolder.name.toUpperCase()}</span>
                       : '' 
                    }
                 </div>
            <div className='settings-options'>
                 <button className='btn btn-primary' onClick={handleUpload}>
                    {
                    loadingFilePercent && loadingFilePercent < 100 
                    ? <ProgressBar label={`${loadingFilePercent}%`} now={loadingFilePercent}  />
                    : <div> <FontAwesomeIcon icon={faUpload}/> Upload </div>}
                 </button>   
                 <input type='file' name='file' id='settings__input-file' ref={fileRef}/>
                 <button className='btn btn-primary' onClick={handleAddNewFolder}>
                    {
                        loadingFolderPercent && loadingFolderPercent < 100
                        ? <ProgressBar label={`${loadingFolderPercent}%`} now={loadingFolderPercent}  />
                        : <div>  <FontAwesomeIcon icon={faPlus} /> Add new folder </div>
                    }
                   
                </button>
            </div>
            <div className='settings-board'>
                <DataTable
                    columns={fileColumns}
                    data = {filesData}
                ></DataTable>
            </div>
        </div>
    )
}