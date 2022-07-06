import { NAVBARS } from "../Components/Constants";

export const getIndexOfFeature = (url) => {
    return NAVBARS.map(bar => bar.link).indexOf(url);
}