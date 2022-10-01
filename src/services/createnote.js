import axios from 'axios';
import { httpApi } from '../assets/api';
function createnote(userName, title, value) {
    let url = `${httpApi}createnote`;
    return axios({
        method: 'post',
        url: url,
        data: {
            userName: userName,
            title: title,
            value: value,
        },
    }).then((data) => data.data);
}
export default createnote;
