import { useEffect, useRef, useState } from 'react';
import InputItem from './InputItem';
import classNames from 'classnames/bind';
import style from '../Home.module.scss';
import { doc } from 'prettier';
import Tippy from '@tippyjs/react/headless';

let cx = classNames.bind(style);
function Note({ HomeController, title = '', value = '', type, id }) {
    let [iTitle, setITitle] = useState(title);
    let [iValue, setIValue] = useState(value);
    let modifyRef = useRef();
    let menuRef = useRef();
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);
    function handleEnterTitle(e) {
        setITitle(e.target.value);
    }
    function handleCreateandUpdate() {
        switch (type) {
            case 'create': {
                if (iTitle && iValue) {
                    HomeController.createNote(iTitle, iValue);
                    setITitle('');
                    setIValue('');
                }
                break;
            }
            case 'update': {
                modifyRef.current.className = cx('');
                menuRef.current.style.display = 'block';
                HomeController.updateNote(id, iTitle, iValue);
            }
        }
    }
    function handleFocus() {
        if (type == 'update') {
            menuRef.current.style.display = 'none';
            modifyRef.current.className = cx('modify');
        }
    }
    function ActionPopper() {
        return (
            <div className={cx('action-popper')}>
                <div onClick={() => HomeController.deleteNote(id)}>Delete note</div>
                <div onClick={coppyClipboard}>Coppy content to clipboard</div>
            </div>
        );
    }
    function coppyClipboard(e) {
        navigator.clipboard.writeText(iValue);
        e.target.innerHTML += '<span>Clipboad coppied!</span>';
        setTimeout(() => {
            e.target.removeChild(e.target.firstElementChild);
            hide();
        }, 1000);
    }
    return (
        <div ref={modifyRef}>
            <div className={cx('note')}>
                <input
                    onBlur={handleCreateandUpdate}
                    className={cx('note-title')}
                    value={iTitle}
                    onChange={handleEnterTitle}
                    placeholder="Enter title note..."
                    spellCheck="false"
                    onFocus={handleFocus}
                ></input>
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
