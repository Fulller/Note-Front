import axios from 'axios';
import { httpApi } from '../assets/api';
function createnote(userName, title, value, images) {
    let url = `${httpApi}/createNote`;
    return axios({
        method: 'post',
        url: url,
        data: {
            userName: userName,
            title: title,
            value: value,
            images: images,
        },
    }).then((data) => data.data);
}
export default createnote;
