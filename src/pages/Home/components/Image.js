import style from '../Home.module.scss';
import classNames from 'classnames/bind';

import handleImageError from '../../../assets/handleImageError';
let cx = classNames.bind(style);
function Image({ link, index, handleDeleteImage }) {
    return (
        <div className={cx('image')}>
            <button onClick={() => handleDeleteImage(index)} className={cx('delete-image-btn')}>
                <i className="fa-solid fa-delete-left"></i>
            </button>
            <img src={link} onError={handleImageError}></img>
        </div>
    );
}
export default Image;
