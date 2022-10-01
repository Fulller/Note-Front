import { useEffect, useState, useContext } from 'react';

import style from './InputItem.module.scss';
import classNames from 'classnames/bind';

let cx = classNames.bind(style);
function InputItem({ handleCreateandUpdate, iValue, setIValue, handleFocus }) {
    let [line, setLine] = useState(1);
    useEffect(() => {
        let countLine = 1;
        for (let v of iValue) {
            if (v == '\n') {
                countLine++;
            }
        }
        setLine(countLine);
    }, [iValue]);
    function handleEnterValue(e) {
        setIValue(e.target.value);
    }
    return (
        <div className={cx('input-item')}>
            <textarea
                rows={line}
                placeholder="Enter your content ..."
                spellCheck="false"
                value={iValue}
                onChange={handleEnterValue}
                onBlur={handleCreateandUpdate}
                onFocus={handleFocus}
            ></textarea>
        </div>
    );
}
export default InputItem;
