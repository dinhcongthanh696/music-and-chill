import { axios , base_url } from "./commonService";

export const getAllTracks = () => {
    const GET_TRACKS_URL = base_url + "/tracks"

    return axios({
        method : 'get',
        url : GET_TRACKS_URL
    }).then(response => response.data);
}

export const getTrackPaginated = (page , trackPerPage) => {
    const GET_TRACKS_PAGINATED_URL = base_url + "/tracks/pagination";

    return axios({
        method : 'get',
        url : GET_TRACKS_PAGINATED_URL ,
        params : {
            page : page ,
            trackPerPage : trackPerPage
        }
    }).then(response => {
        console.log(response.data);
        return response.data;
    });
}