import { ActionTypes } from "../Action/ActionTypes";
import { FOLDER_TYPE, UPLOAD_FILE_PERCENT, UPLOAD_FOLDER_PERCENT } from "../Components/Constants";
const defaultState = {
    contextFolders: [{
        id: 0,
        name: "Root",
        files: [],
        parentFolders: [],
        isActive: true
    }],
    completedPercent: [
        {
            type : UPLOAD_FOLDER_PERCENT,
            percent : 100
        },
        {
            type : UPLOAD_FILE_PERCENT,
            percent : 100
        }
    ]
};
export default function fileReducer(state = defaultState, action) {
    switch (action.type) {
        case ActionTypes.CREATE_FILE:
            console.log('File Name : ' + action.payload.fileName);
            return {
                ...state,
                contextFolders: action.payload.type === FOLDER_TYPE ? [
                    ...state.contextFolders.map(folder => {
                        if (folder.isActive) {
                            return {
                                ...folder,
                                files: [
                                    ...folder.files,
                                    {
                                        id: action.payload.id,
                                        name: action.payload.fileName,
                                        type: action.payload.type,
                                        isClickable: action.payload.isClickable
                                    }
                                ]
                            }
                        }
                        return folder;
                    }),
                    {
                        id: action.payload.id,
                        name: action.payload.fileName,
                        isActive: false,
                        files: [],
                        parentFolders: [
                            ...action.payload.contextFolder.parentFolders,
                            action.payload.contextFolder
                        ]
                    }
                ] : [
                    ...state.contextFolders.map(folder => {
                        if (folder.isActive) {
                            return {
                                ...folder,
                                files: [
                                    ...folder.files,
                                    {
                                        id: action.payload.id,
                                        name: action.payload.fileName,
                                        type: action.payload.type,
                                        isClickable: action.payload.isClickable
                                    }
                                ]
                            }
                        }
                        return folder;
                    })
                ]
            }
        case ActionTypes.DELETE_FOLDER:
            return {
                ...state,
                contextFolders: [
                    ...state.contextFolders.map(folder => {
                        if (folder.isActive) {
                            return {
                                ...folder,
                                files: folder.files.filter(file => {
                                    return file.id !== action.payload.id;
                                })
                            }
                        }
                        return folder;
                    })
                ]
            }
        case ActionTypes.UPDATE_FOLDER:
            return {
                ...state,
                contextFolders: [
                    ...state.contextFolders.map(folder => {
                        if (folder.isActive) {
                            return {
                                ...folder,
                                files: folder.files.map(folder => {
                                    if (folder.id === action.payload.id) {
                                        return {
                                            ...folder,
                                            name: action.payload.folderName
                                        }
                                    }
                                    return folder;
                                })
                            }
                        } else if (folder.id === action.payload.id) {
                            return {
                                ...folder,
                                name: action.payload.folderName
                            }
                        }
                        return folder;
                    })
                ]
            }
        case ActionTypes.UPDATE_LOADING_PERCENT:
            return {
                ...state,
                completedPercent: [
                    ...state.completedPercent.map(loading => {
                        if(loading.type === action.payload.type){
                            return {
                                ...loading,
                                percent : action.payload.percent
                            }
                        }
                        return loading;
                    })
                ]
            }
        case ActionTypes.CHANGE_FOLDER_CONTEXT:
            const newContextFolders = [...state.contextFolders];
                for (let i = 0; i < newContextFolders.length; i++) {
                    if (newContextFolders[i].id === action.payload.id) {
                        newContextFolders[i] = {
                            ...newContextFolders[i],
                            isActive: true
                        }
                    } else if (newContextFolders[i].isActive) {
                        newContextFolders[i] = {
                            ...newContextFolders[i],
                            isActive: false
                        }
                    }
                }
            return {
                ...state,
                contextFolders: newContextFolders
            }
        /*   case actionTypes.ADD_NEW_PARENT_FOLDER : 
               return {
                   ...state,
                   contextFolders : state.contextFolders.map(folder => {
                       if(folder.id === action.payload.id){
                           return {
                               ...folder,
                               files : folder.files.push({
                                   id : action.payload.contextFolderId,
                                   name : action.payload.name,
                                   isClickable : true,
                                   type : FOLDER_TYPE
                               })
                           }
                       }
                       return folder;
                   })
               } */
        case ActionTypes.RESET_FILES_STATE: return defaultState;
        default: return state
    }
}