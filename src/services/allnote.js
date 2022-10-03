import axios from 'axios';
import { httpApi } from '../assets/api';
function allnotes(userName) {
    let url = `${httpApi}/allnotes`;
    return axios({
        method: 'post',
        url: url,
        data: {
            userName: userName,
        },
    }).then((data) => data.data);
}
export default allnotes;
