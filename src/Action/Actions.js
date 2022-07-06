import { ActionTypes } from './ActionTypes.js'
import { createFolder, deleteFile, renameFile, upload } from '../Service/fileService.js'
import { FOLDER_TYPE, IMAGE_TYPE } from '../Components/Constants.js'
export const login = (currentUser) => {
    return {
        type: ActionTypes.LOGIN,
        payload: currentUser
    }
}

export const logout = () => {
    return {
        type: ActionTypes.LOGOUT
    }
}

export const navigating = (index) => {
    return {
        type: ActionTypes.NAVIGATING,
        payload: {
            index: index
        }
    }
}

export const changeFolderContextCreator = (id , name) => {
    return {
        type : ActionTypes.CHANGE_FOLDER_CONTEXT , 
        payload : {
            id : id ,
            name : name
        }
    }
}

export const createFile = (fileName, id, type , isClickable , contextFolder) => {
    return {
        type: ActionTypes.CREATE_FILE,
        payload: {
            fileName: fileName,
            id: id,
            type: type ,
            isClickable : isClickable,
            contextFolder : contextFolder
        }
    }
}

export const resetFilesState = () => {
    return {
        type: ActionTypes.RESET_FILES_STATE
    }
}

export const resetFeatureState = () => {
    return {
        type : ActionTypes.RESET_FEATURE_STATE
    }
}

export const updateFolder = (id, folderName) => async (dispatch, getState) => {
    console.log('Dispatching : '+folderName);
    await renameFile(id, folderName);
    dispatch({
        type: ActionTypes.UPDATE_FOLDER,
        payload: {
            id: id,
            folderName: folderName
        }
    })
}

export const updateLoadingPercent = (percent , type) => {
    return {
        type : ActionTypes.UPDATE_LOADING_PERCENT,
        payload : {
            percent : percent,
            type : type
        }
    }
}

export const deleteFileCreatetor = (id) => {
    return {
        type: ActionTypes.DELETE_FOLDER,
        payload: {
            id: id
        }
    }
}

export const uploadFile = (file) => async (dispatch, getState) => {
    var contextFolder;
    var state = getState();
    for(let i = 0 ; i < state.files.contextFolders.length ; i++){
        if(state.files.contextFolders[i].isActive){
            contextFolder = state.files.contextFolders[i];
            break;
        }
    }
    const uploadedFile = await upload(file);
    dispatch(createFile(uploadedFile.name, uploadedFile.id , IMAGE_TYPE , false , contextFolder));
}

export const createNewFolder = () => async (dispatch, getState) => {
    var contextFolder;
    var state = getState();
    for(let i = 0 ; i < state.files.contextFolders.length ; i++){
        if(state.files.contextFolders[i].isActive){
            contextFolder = state.files.contextFolders[i];
            break;
        }
    }
    const uploadedFolder = await createFolder();
    //dispatch(addNewParentFolder(id , name , contextId)); 
    dispatch(createFile('', uploadedFolder.id, FOLDER_TYPE , uploadedFolder.isClickable , contextFolder));
}

export const deleteFolder = (id) => async (dispatch, getState) => {
    const isDeleteSuccess = await deleteFile(id);
    if(isDeleteSuccess)
    dispatch(deleteFileCreatetor(id));
}
/*
export const addNewParentFolderCreator = (id , name , contextFolderId) => {
    return {
        type : actionTypes.ADD_NEW_PARENT_FOLDER,
        payload : {
            id : id,
            name : name,
            contextFolderId : contextFolderId
        }
    }
} 
*/
export const changeFolderContext = (id , name) => async (dispatch , getState) => {
    const isContaining = getState().files.contextFolders.filter(folder => {
        return folder.id === id;
    })
   /* let parentFolders;
    let childFiles;
    if(isContaining.length === 0 || id === 0 ||
        isContaining[0].files.length === 0 || isContaining[0].parentFolders.length){
        parentFolders = await getParentFolders(id);
        childFiles = await getChildrenFiles(id);
    } */
    dispatch(changeFolderContextCreator(id , name));
}
