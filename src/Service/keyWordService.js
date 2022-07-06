import { axios , base_url } from "./commonService"

export const topKeyWordPromise = (topNumber) => {
    return axios.get(base_url + `/get-top-keyword${topNumber ? `?number=${topNumber}` : ""}`)
    .then(response => response.data);
} 

export const addKeyWordPromise = (query) => {
    return axios.get(base_url + `/add-keyword?query=${query}`);
}