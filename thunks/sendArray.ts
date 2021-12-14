import { Dispatch } from "redux";

import { sendArrayError, sendArrayRequest, sendArraySuccess } from "../actions";
import { API_URI } from "../constants";


interface DataInterface {
    name: string,
    array: string[]
}

const fetchArray = async (data: DataInterface) => {

    return await fetch(`${API_URI}/array`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...data,
            array: data.array.join()
        }),
    });
};

const sendArray = (data: DataInterface) => {
    return (dispatch: Dispatch) => {
        dispatch(sendArrayRequest());

        return fetchArray(data).then((response) => {
            if (response.status === 200) {
                dispatch(sendArraySuccess())
            } else {
                dispatch(sendArrayError())
            }
        });
    }
};

export default sendArray;