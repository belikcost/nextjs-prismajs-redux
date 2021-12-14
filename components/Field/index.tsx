import React, { Dispatch, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import sendArray from "../../thunks/sendArray";

import { StatusEnum } from "../../enums";
import { ColorType, StateInterface } from "../../types";
import { COLORS } from "../../constants";

import styles from "../../styles/Home.module.css";


interface FieldPropsInterface {
    siteColor: ColorType,
    setSiteColor: Dispatch<SetStateAction<ColorType>>,
}

const INITIAL_ARRAY = Array.from(Array(3)).map(_ => '');

const Field = ({ siteColor, setSiteColor }: FieldPropsInterface) => {
    const dispatch = useDispatch();
    const status = useSelector((state: StateInterface) => state.status);

    const [name, setName] = useState('');
    const [array, setArray] = useState(INITIAL_ARRAY);

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(sendArray({ name, array }));
    };

    const onChangeArrayElement = (changedValue: string, changedValueIndex: number) => {
        setArray((prevArray) => {
            return prevArray.map((value, index) => changedValueIndex === index ? changedValue : value);
        });
    };

    return (
        <div className={styles.field + ' bg-dark px-4'}>
            <div className="d-flex justify-content-center pt-4 pb-5 mb-5">
                {COLORS.map((color, i) => (
                        <div
                            className={`mx-3 ${styles.colors} ${color === siteColor ? styles.active : ''}`}
                            onClick={() => setSiteColor(color)}
                            style={{ backgroundColor: color }}
                            key={i}
                        />
                    )
                )}
            </div>
            <form className="d-flex flex-column mx-auto align-items-center w-75" onSubmit={submitForm}>
                <label className="w-100 py-5">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-100 px-2"
                        required
                        placeholder="Название"
                    />
                </label>
                <div className="d-flex text-white justify-content-between">
                    <h5>Массив</h5>
                    <div className="d-flex w-50 justify-content-end">
                        <span className="mx-2">[</span>
                        {array.map((value, i) => (
                            <React.Fragment key={i}>
                                <label className="w-25">
                                    <input
                                        onChange={(e) => onChangeArrayElement(e.target.value, i)}
                                        value={value}
                                        className='w-100'
                                        required
                                    />
                                </label>
                                {i < array.length - 1 && (
                                    <span className="mx-2">,</span>
                                )}
                            </React.Fragment>
                        ))}
                        <span className="mx-2">]</span>
                    </div>
                </div>
                <button className={`mt-5 mb-4 border-0 py-2 px-5 font-weight-bold ${styles.button}`}>
                    Отправить
                </button>
            </form>
            {status && (
                <div className="d-flex justify-content-center align-items-center mb-3">
                    <h5 className={'text-white'}>Статус</h5>
                    {status === StatusEnum.error && (
                        <span className={`${styles.status} d-block mx-3 bg-danger`}/>
                    )}
                    {status === StatusEnum.success && (
                        <span className={`${styles.status} d-block mx-3 bg-success`}/>
                    )}
                </div>
            )}
        </div>
    );
};

export default Field;