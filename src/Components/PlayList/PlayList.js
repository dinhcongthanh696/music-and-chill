"use strict";
var ThemeContext_1 = require("../../Context/ThemeContext");
var react_1 = require("react");
require("./PlayList.css");
export default function PlayList() {
    var theme = (0, react_1.useContext)(ThemeContext_1.ThemeContext).theme;
    return (<div className={"play-list ".concat(theme)}>
            PlayList
        </div>);
}
