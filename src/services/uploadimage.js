import axios from 'axios';
import { httpApi } from '../assets/api';
function uploadimage(file) {
    let url = `${httpApi}/upload`;
    let bodyFormData = new FormData();
    bodyFormData.append('image', file);
    return axios({
        method: 'post',
        url: url,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: bodyFormData,
    }).then((data) => data.data);
}
export default uploadimage;
