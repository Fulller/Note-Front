import style from '../Home.module.scss';
import classNames from 'classnames/bind';

let cx = classNames.bind(style);
function Image({ link, index, handleDeleteImage }) {
    return (
        <div className={cx('image')}>
            <button onClick={() => handleDeleteImage(index)} className={cx('delete-image-btn')}>
                <i className="fa-solid fa-delete-left"></i>
            </button>
            <img src={link}></img>
        </div>
    );
}
export default Image;
