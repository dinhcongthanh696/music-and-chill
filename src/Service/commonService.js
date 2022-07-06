export const axios = require("axios");

export const base_url = "http://localhost:8080/MusicChill/api";
export const queryArtistAndTrackPromise = (query) => {
    return axios.get(base_url + `/search-artist-track?query=${query}`).then(response => response.data);
}