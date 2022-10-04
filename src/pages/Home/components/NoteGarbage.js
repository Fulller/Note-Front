import { useEffect, useRef, useState, useContext } from 'react';
import InputItem from './InputItem';
import classNames from 'classnames/bind';
import style from '../Home.module.scss';
import NoteGarbageStyle from './NoteGarbage.module.scss';
import { doc } from 'prettier';
import Tippy from '@tippyjs/react/headless';
import { GlobalContext } from '../../../App';
import language from '../../../assets/language';
import handleImageError from '../../../assets/handleImageError';

let cx = classNames.bind(NoteGarbageStyle);
function NoteGarbage({ HomeController, title = '', value = '', type, id, imagesprops }) {
    let [globalState, dispacth] = useContext(GlobalContext);
    let languageName = globalState.language;
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
                <button onClick={() => HomeController.foreverdeleteNote(id)}>
                    {language.deleteforever[languageName]}
                </button>
                <button onClick={() => HomeController.restoreNote(id)}>{language.restore[languageName]}</button>
            </div>
            <div className={cx('show-image')}>
                {imagesprops.map((image, index) => {
                    return <img src={image} onError={handleImageError}></img>;
                })}
            </div>
            <textarea value={value} rows={countLine()} style={{ resize: 'none' }}></textarea>
        </div>
    );
}
export default NoteGarbage;
