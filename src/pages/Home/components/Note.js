import { useEffect, useRef, useState } from 'react';
import InputItem from './InputItem';
import classNames from 'classnames/bind';
import style from '../Home.module.scss';
import { doc } from 'prettier';

let cx = classNames.bind(style);
function Note({ HomeController, title = '', value = '', type, id }) {
    let [iTitle, setITitle] = useState(title);
    let [iValue, setIValue] = useState(value);
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
                HomeController.updateNote(id, iTitle, iValue);
            }
        }
    }
    return (
        <div className={cx('note')}>
            <input
                onBlur={handleCreateandUpdate}
                className={cx('note-title')}
                value={iTitle}
                onChange={handleEnterTitle}
                placeholder="Enter title note..."
                spellCheck="false"
            ></input>
            <InputItem iValue={iValue} setIValue={setIValue} handleCreateandUpdate={handleCreateandUpdate}></InputItem>
        </div>
    );
}
export default Note;
