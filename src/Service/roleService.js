import { axios } from "./commonService"
export function getRolesByFeaturePromise(url){
    return axios.get(url , {
        params : {
            url : url
        }
    })
    .then(response => response.data)
    .catch(errors => {
        console.log(errors.message);
        return null;
    });
}