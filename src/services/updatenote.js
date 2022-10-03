import axios from 'axios';
import { httpApi } from '../assets/api';
function updatenote(id, title, value) {
    let url = `${httpApi}/updateNote`;
    return axios({
        method: 'post',
        url: url,
        data: {
            id: id,
            title: title,
            value: value,
        },
    }).then((data) => data.data);
}
export default updatenote;
