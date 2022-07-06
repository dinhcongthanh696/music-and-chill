import store from "../Store/store";
import { useNavigate } from "react-router-dom";
import { isValidTokenPromise } from "../Service/userService";
import { getRolesByFeaturePromise } from "../Service/roleService";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { navigating } from "../Action/Actions";
import { getIndexOfFeature } from "../Service/featureService";
import { HOME_URL } from "./Constants";
function ProtectedComponent({ feature, children }) {
    const navigater = useNavigate();
    console.log("Protected Component is checking ....");
    const currentUser = store.getState().userReducer.currentUser;
    const dispatcher = useDispatch();

    const isHavingPermission = (roles) => {
        if (!roles || roles.length === 0) return true;
        const userRoles = JSON.parse(currentUser.roles);
        return userRoles.length !== 0 && userRoles.filter(role => {
            return roles.indexOf(role) !== -1;
        }).length !== 0;
    }

    getRolesByFeaturePromise(feature)
    .then(roles => {
        console.log(roles);
        if (!currentUser.username) {
            console.log("user is not valid");
            navigater(HOME_URL);
            return;
        } else {
            const validateToken = async () => {
                const isValidToken = await isValidTokenPromise(currentUser.access_token);
                console.log('Is valid token : ' + isValidToken);
                
                if (!isValidToken) {
                    console.log("user is not valid");
                    navigater(HOME_URL);
                    dispatcher(navigating(getIndexOfFeature(HOME_URL)))
                    return;
                } else if (!isHavingPermission(roles)) {
                    alert("You have not permission");
                    navigater(HOME_URL);
                    dispatcher(navigating(getIndexOfFeature(HOME_URL)))
                    return;
                }
                return (children);
            }
            validateToken();
        }
    })

}

export default ProtectedComponent;