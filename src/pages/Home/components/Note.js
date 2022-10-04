import { useEffect, useRef, useState, useContext } from 'react';
import InputItem from './InputItem';
import classNames from 'classnames/bind';
import style from '../Home.module.scss';
import { doc } from 'prettier';
import Tippy from '@tippyjs/react/headless';

import { GlobalContext } from '../../../App';
import language from '../../../assets/language';
import { uploadimage } from '../../../services';

let cx = classNames.bind(style);
function Note({ HomeController, title = '', value = '', type, id, imagesprops }) {
    let [globalState, dispacth] = useContext(GlobalContext);
    let laguageName = globalState.language;
    let [iTitle, setITitle] = useState(title);
    let [iValue, setIValue] = useState(value);
    let modifyRef = useRef();
    let menuRef = useRef();
    let addimageRef = useRef();
    let [images, setImages] = useState(imagesprops);
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);
    function handleEnterTitle(e) {
        setITitle(e.target.value);
    }
    function handleCreateandUpdate(e) {
        switch (type) {
            case 'create': {
                if (iTitle && iValue) {
                    HomeController.createNote(iTitle, iValue, images);
                    setITitle('');
                    setIValue('');
                    setImages([]);
                }
                break;
            }
            case 'update': {
                HomeController.updateNote(id, iTitle, iValue, images);
            }
        }
    }
    function handleFocus() {
        if (type == 'update') {
            menuRef.current.style.display = 'none';
            addimageRef.current.style.display = 'none';
            modifyRef.current.className = cx('modify');
        }
    }
    function ActionPopper() {
        return (
            <div className={cx('action-popper')}>
                <div onClick={() => HomeController.deleteNote(id)}>{language.deletenote[laguageName]}</div>
                <div onClick={coppyClipboard}>{language.coppyclipboad[laguageName]}</div>
            </div>
        );
    }
    function coppyClipboard(e) {
        navigator.clipboard.writeText(iValue);
        e.target.innerHTML += `<span>${language.coppied[laguageName]}</span>`;
        setTimeout(() => {
            e.target.removeChild(e.target.firstElementChild);
            hide();
        }, 1000);
    }
    async function handleAddImage(e) {
        let pahthImage = await uploadimage(e.target.files[0]);
        HomeController.updateNote(id, iTitle, iValue, [...images, pahthImage]);
    }
    return (
        <div>
            <div className={cx('note')}>
                <input
                    onBlur={handleCreateandUpdate}
                    className={cx('note-title')}
                    value={iTitle}
                    onChange={handleEnterTitle}
                    placeholder={language.entertitilenote[laguageName]}
                    spellCheck="false"
                    onFocus={handleFocus}
                ></input>
                <div ref={addimageRef} className={cx('add-image')}>
                    <input
                        onChange={async (e) => {
                            await handleAddImage(e);
                            await handleCreateandUpdate(e);
                        }}
                        id={'add-image' + id}
                        type="file"
                    ></input>
                    <label for={'add-image' + id}>
                        <i className="fa-regular fa-images"></i>
                    </label>
                </div>
                {type == 'update' ? (
                    <Tippy
                        placement="left-start"
                        interactive={true}
                        visible={visible}
                        onClickOutside={hide}
                        render={(attrs) => <ActionPopper></ActionPopper>}
                    >
                        <button ref={menuRef} onClick={visible ? hide : show}>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                    </Tippy>
                ) : (
                    <></>
                )}
                <div className={cx('show-image')}>
                    {images.map((image, index) => {
                        return <img src={image}></img>;
                    })}
                </div>
                <InputItem
                    handleFocus={handleFocus}
                    iValue={iValue}
                    setIValue={setIValue}
                    handleCreateandUpdate={handleCreateandUpdate}
                ></InputItem>
            </div>
        </div>
    );
}
export default Note;
