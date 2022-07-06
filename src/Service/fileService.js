import { base_url, axios } from "./commonService"
import store from "../Store/store";
import { updateLoadingPercent } from "../Action/Actions";
import { UPLOAD_FILE_PERCENT, UPLOAD_FOLDER_PERCENT } from "../Components/Constants";
function getFolderContextId(state) {
    for (let i = 0; i < state.files.contextFolders.length; i++) {
        if (state.files.contextFolders[i].isActive) {
            return state.files.contextFolders[i].id;
        }
    }
    return 0;
}

export function upload(file) {
    const UPLOAD_URL = base_url + "/upload";
    const formData = new FormData();
    const contextFolderId = getFolderContextId(store.getState());
    formData.append("file", file);
    formData.append("parentId", contextFolderId);
    return axios({
        method: "post",
        url: UPLOAD_URL,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: estimateProgress(0)(UPLOAD_FILE_PERCENT),
        onDownloadProgress: estimateProgress(50)(UPLOAD_FILE_PERCENT)
    }).then(response => response.data)
}

const estimateProgress = (preloadedPercent) => (uploadType) => (progressEvent) => {
            console.log(progressEvent.loaded + " " + progressEvent.total);
            var percentCompleted = preloadedPercent + Math.round((progressEvent.loaded * 100 / progressEvent.total) / 2);
            console.log('completed: ', percentCompleted);
            store.dispatch(updateLoadingPercent(percentCompleted , uploadType));
} 


export function createFolder() {
    const CREATE_FOLDER_URL = base_url + "/create-folder";
    const contextFolderId = getFolderContextId(store.getState());
    /*
        return fetch(`${CREATE_FOLDER_URL}?parentId=${contextFolderId}`).then(response => response.json())    
    */
    return axios({
        method: 'GET',
        url: CREATE_FOLDER_URL,
        params: {
            parentId: contextFolderId
        },
        onUploadProgress: estimateProgress(0)(UPLOAD_FOLDER_PERCENT),
        onDownloadProgress: estimateProgress(50)(UPLOAD_FOLDER_PERCENT)
    }).then(response => response.data);
}

export function deleteFile(id) {
    const DELETE_FILE_URL = base_url + "/delete-file";
    const formData = new FormData();
    formData.append("id", id);
    return fetch(DELETE_FILE_URL, {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.status >= 200 && response.status <= 299) {
            return true;
        }
        return false;
    })
        .catch(error => {
            console.log(error.message);
            return false;
        });
}

export function renameFile(id, name) {
    const RENAME_FILE_URL = base_url + "/rename-file";
    return fetch(`${RENAME_FILE_URL}?id=${id}&name=${name}`).then(response => response.text());
}
/*
export function getParentFolders(id){
    const GET_PARENT_FOLDERS_URL = base_url + "/parent-folders";
    return axios({
        method : 'get',
        params : {
            id : id
        } ,
        url : GET_PARENT_FOLDERS_URL
    }).then(response => response.data)
}

export function getChildrenFiles(id){
    const GET_CHILDREN_URL = base_url + "/children-files";
    return axios({
        method : 'get',
        params : {
            id : id
        } ,
        url : GET_CHILDREN_URL
    }).then(response => response.data)
} */

