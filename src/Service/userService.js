import { axios } from "./commonService"
const base_url = "http://localhost:8080/MusicChill";
export const authenticatePromise = (username , password) => {
    return axios.post(base_url + "/login" , {
        username : username,
        password : password
    },{
        params : {
            username : username,
            password : password
        }
    }).then(response => response.data);
}


export const isValidTokenPromise = (token) => {
    return axios.get(base_url + "/api/verifyToken" , {
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    })
    .then(response => true)
    .catch(errors => {
        console.log(errors.message);
        return false;
    });
}