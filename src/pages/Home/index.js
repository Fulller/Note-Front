import { useContext, useState, useEffect, useRef, useReducer } from 'react';
import { Link } from 'react-router-dom';

import { GlobalContext } from '../../App';
import classNames from 'classnames/bind';
import style from './Home.module.scss';
import Note from './components/Note';
import InputItem from './components/InputItem';
import { allnotes, createnote } from '../../services';

let cx = classNames.bind(style);
function Home() {
    let [globalState, dispatch] = useContext(GlobalContext);
    let [allNote, setAllNote] = useState();
    let userName = globalState.user.userName;
    let HomeController = {
        loadAllNote: async function (userName) {
            let allNoteData = await allnotes(userName);
            setAllNote(allNoteData.data.reverse());
        },
        createNote: async function (title, value) {
            await createnote(userName, title, value);
            this.loadAllNote(userName);
            window.location.reload();
        },
    };
    useEffect(() => {
        HomeController.loadAllNote(userName);
    }, [userName]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('create-note')}>
                <Note HomeController={HomeController} type="create"></Note>
            </div>
            <div className={cx('wrapper-note')}>
                {allNote
                    ? allNote.map((note, index) => {
                          return (
                              <Note
                                  key={index}
                                  HomeController={HomeController}
                                  title={note.title}
                                  value={note.value}
                                  type="update"
                              ></Note>
                          );
                      })
                    : ''}
            </div>
        </div>
    );
}
export default Home;
