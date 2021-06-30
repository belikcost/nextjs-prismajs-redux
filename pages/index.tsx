import React, {useEffect, useState} from "react";
import styles from '../styles/Home.module.css';
import {useDispatch, useSelector} from "react-redux";

function fetchPostsSuccess(payload: any) {
    return {
        type: "FETCH_SUCCESS",
        payload
    }
}

function fetchPostsRequest() {
    return {
        type: "FETCH_REQUEST"
    }
}

function fetchPostsError() {
    return {
        type: "FETCH_ERROR"
    }
}

function fetchPosts(data: any) {
    const URL = "api/array";
    console.log(data);
    return fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }).then(response => {
        return Promise.all([response, response.json()]);
    });
}


export default function Home() {
    const dispatch = useDispatch();
    const state = useSelector((state: {status: number}) => state);
    const colors = ['#DB3333', '#DB6F33', '#DBC033', '#69DB33', '#33DB9E', '#33C7DB', '#3376DB', '#3633DB', '#7D33DB', '#D833DB'];
    const [color, setColor] = useState(colors[0]);
    const [name, setName] = useState('');
    const [arrayOne, setArrayOne] = useState('');
    const [arrayTwo, setArrayTwo] = useState('');
    const [arrayThree, setArrayThree] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    function fetchPostsWithRedux(data: any) {
        return (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
            dispatch(fetchPostsRequest());
            return fetchPosts(data).then(([response, json]) => {
                if (response.status === 200) {
                    dispatch(fetchPostsSuccess(json))
                    console.log('success!');
                } else {
                    console.log('error');
                    dispatch(fetchPostsError())
                }
            })
        }
    }

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let data = {
            name,
            array: [arrayOne, arrayTwo, arrayThree].join()
        };
        dispatch(fetchPostsWithRedux(data));
    }
    useEffect(() => {
        let c = localStorage.getItem('color');
        c && setColor(c);
        setIsLoading(false);
    }, []);
    if (isLoading) {
        return null;
    } else {
        console.log(state);
        return (
            <div className="w-100 h-100 position-fixed d-flex justify-content-center align-items-center"
                 style={{backgroundColor: color}}>
                <div className={styles.field + ' bg-dark px-4'}>
                    <div className="d-flex justify-content-center pt-4 pb-5 mb-5">
                        {colors.map((c, i) => (
                            <div
                                className={styles.colors + ' mx-3' + (c === color ? ' ' + styles.active : '')}
                                key={i}
                                onClick={() => {
                                    localStorage.setItem('color', colors[i]);
                                    setColor(colors[i])
                                }}
                                style={{backgroundColor: c}}
                            />))};
                    </div>
                    <form className="d-flex flex-column mx-auto align-items-center w-75" onSubmit={submitForm}>
                        <label className="w-100 py-5">
                            <input type="text"
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}
                                   className="w-100 px-2"
                                   required
                                   placeholder="Название"/>
                        </label>
                        <div className="d-flex text-white justify-content-between">
                            <h5>Массив</h5>
                            <div className="d-flex w-50 justify-content-end">
                                <span className="mx-2">[</span>
                                <label className="w-25">
                                    <input onChange={(e) => setArrayOne(e.target.value)}
                                           value={arrayOne}
                                           type="text"
                                           className='w-100'
                                           required/>
                                </label>
                                <span className="mx-2">,</span>
                                <label className="w-25">
                                    <input onChange={(e) => setArrayTwo(e.target.value)}
                                           value={arrayTwo}
                                           type="text"
                                           className='w-100'
                                           required/>
                                </label>
                                <span className="mx-2">,</span>
                                <label className="w-25">
                                    <input onChange={(e) => setArrayThree(e.target.value)}
                                           value={arrayThree}
                                           type="text"
                                           className='w-100'
                                           required/>
                                </label>
                                <span className="mx-2">]</span>
                            </div>
                        </div>
                        <button className={styles.button + ' mt-5 mb-4 border-0 py-2 px-5 font-weight-bold'}>Отправить
                        </button>
                    </form>
                    <div className="d-flex justify-content-center align-items-center mb-3">
                        <h5 className={'text-white'}>Статус</h5>
                        <span className={styles.status + ' d-block mx-3' + (state.status === 200 ? ' bg-success' :
                            (state.status === 404 ? ' bg-danger' : ''))}/>
                    </div>
                </div>
            </div>
        )
    }
}
