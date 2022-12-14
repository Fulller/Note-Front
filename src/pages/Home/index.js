import { useContext, useState, useEffect, useRef, useReducer, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { GlobalContext } from '../../App';
import classNames from 'classnames/bind';
import style from './Home.module.scss';
import Note from './components/Note';
import NoteGarbage from './components/NoteGarbage';
import Header from './components/Header';
import language from '../../assets/language';
import { allnotes, createnote, updatenote, deletenote, restore, foreverdelete } from '../../services';

let cx = classNames.bind(style);
function Home() {
    let [globalState, dispatch] = useContext(GlobalContext);
    let languageName = globalState.language;
    let [allNote, setAllNote] = useState();
    let [page, setPage] = useState('allnote');
    let userName = globalState.user.userName;
    let HomeController = {
        changePage: function (namePage) {
            setPage(namePage);
        },
        loadAllNote: async function (userName) {
            let allNoteData = await allnotes(userName);
            setAllNote(allNoteData.data.reverse());
        },
        createNote: async function (title, value, images) {
            await createnote(userName, title, value, images);
            this.loadAllNote(userName);
        },
        updateNote: async function (id, title, value, images) {
            let data = await updatenote(id, title, value, images);
            this.loadAllNote(userName);
        },
        deleteNote: async function (id) {
            await deletenote(id);
            this.loadAllNote(userName);
        },
        restoreNote: async function (id) {
            await restore(id);
            this.loadAllNote(userName);
        },
        foreverdeleteNote: async function (id) {
            await foreverdelete(id);
            this.loadAllNote(userName);
        },
    };
    useEffect(() => {
        HomeController.loadAllNote(userName);
    }, [userName]);
    function Page() {
        switch (page) {
            case 'allnote': {
                return allNote ? (
                    allNote.map((note, index) => {
                        return note.isDelete ? (
                            <Fragment></Fragment>
                        ) : (
                            <Note
                                key={index}
                                HomeController={HomeController}
                                title={note.title}
                                value={note.value}
                                id={note._id}
                                type="update"
                                imagesprops={note.images}
                            ></Note>
                        );
                    })
                ) : (
                    <></>
                );
            }
            case 'garbage': {
                return allNote ? (
                    allNote.map((note, index) => {
                        return note.isDelete ? (
                            <NoteGarbage
                                key={index}
                                HomeController={HomeController}
                                title={note.title}
                                value={note.value}
                                id={note._id}
                                imagesprops={note.images}
                            ></NoteGarbage>
                        ) : (
                            <Fragment></Fragment>
                        );
                    })
                ) : (
                    <></>
                );
            }
        }
    }
    return (
        <div className={cx('wrapper')}>
            <Header HomeController={HomeController} page={page}></Header>

            {page == 'allnote' ? (
                <div className={cx('create-note')}>
                    <Note HomeController={HomeController} type="create" imagesprops={[]}></Note>
                </div>
            ) : (
                <h1>{language.notifidelete7day[languageName]}</h1>
            )}
            <div className={cx('wrapper-note')}>
                <Page></Page>
            </div>
        </div>
    );
}
export default Home;
