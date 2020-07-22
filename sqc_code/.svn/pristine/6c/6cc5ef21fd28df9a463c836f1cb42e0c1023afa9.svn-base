import {
    mapState
} from "vuex";
import moment from 'moment'

let btnQX = {};

btnQX.apiUrlList = function (val) {
    let disabled = false;
    var apiuserList = sessionStorage.getItem("apiUrlList");
    if (typeof (apiuserList) === "undefined" || !apiuserList) {
        return disabled;
    }
    let apiUrlList = JSON.parse(apiuserList)
    for (let i = 0; i < apiUrlList.length; i++) {
        if (apiUrlList[i] == val) {
            disabled = true;
            break
        }
    }
    return disabled;
}
export default btnQX;