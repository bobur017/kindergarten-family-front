import axios from "axios";
import {baseUrl} from "./Default";
import {loadingPage} from "./pages/login/ReducerLogin";

const api = ({ dispatch }) => (next) => (action) => {
    if (action.type !== 'api/call') {
        next(action);
        return;
    } else {
        const { url, method, data, headers, params, success, error,responseType } = action.payload;
        console.log(params,data, url, "data");
        axios({
            baseURL: baseUrl(),
            url,
            method,
            data,
            headers,
            params,
            responseType,
        }).then(res => {
            dispatch({
                type: success,
                payload: res.data
            });
            dispatch(loadingPage(false));
            console.log(res.data, "success");
        }).catch(err => {
            dispatch({
                type: error,
                payload: err
            });
            dispatch(loadingPage(false));
            console.log(err, "error");
        });
    }
}
export default api;
