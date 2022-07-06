import { UPLOAD_FILE_PERCENT, UPLOAD_FOLDER_PERCENT } from "../Components/Constants";

export const selectFiles = (state) => {
    for(let i = 0 ; i < state.files.contextFolders.length ; i++){
        if(state.files.contextFolders[i].isActive){
            return state.files.contextFolders[i].files;
        }
    } 
    return null;
}

export const selectRootFolder = (state) => {
    return state.files.contextFolders[0];
}

export const selectUploadFilePercent = (state) => {
    return state.files.completedPercent.find(loading => {
        return loading.type === UPLOAD_FILE_PERCENT;
    }).percent;
}

export const selectCreateFolderPercent = (state) => {
    return state.files.completedPercent.find(loading => {
        return loading.type === UPLOAD_FOLDER_PERCENT;
    }).percent;
}


export const selectContextFolder = (state) => {
    for(let i = 0 ; i < state.files.contextFolders.length ; i++){
        if(state.files.contextFolders[i].isActive){
            return state.files.contextFolders[i];
        }
    } 
    return null;
}





