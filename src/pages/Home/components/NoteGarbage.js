import { useEffect, useRef, useState } from 'react';
import InputItem from './InputItem';
import classNames from 'classnames/bind';
import style from '../Home.module.scss';
import NoteGarbageStyle from './NoteGarbage.module.scss';
import { doc } from 'prettier';
import Tippy from '@tippyjs/react/headless';

let cx = classNames.bind(NoteGarbageStyle);
function NoteGarbage({ HomeController, title = '', value = '', type, id }) {
    console.log(title, id);
    function countLine() {
        let line = 1;
        for (let i of value) {
            if (i == '\n') {
                line++;
            }
        }
        return line;
    }
    return (
        <div className={cx('note')}>
            <input className={cx('note-title')} value={title}></input>
            <div className={cx('action')}>
                <button onClick={() => HomeController.foreverdeleteNote(id)}>Delete forever</button>
                <button onClick={() => HomeController.restoreNote(id)}>Restore</button>
            </div>
            <textarea value={value} rows={countLine()} style={{ resize: 'none' }}></textarea>
        </div>
    );
}
export default NoteGarbage;
