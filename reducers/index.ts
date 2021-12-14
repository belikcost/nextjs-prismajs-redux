import { Action } from "redux";

import { StatusEnum } from "../enums";
import { StateInterface } from "../types";


const INITIAL_STATE = {
    status: null,
};

const reducer = (state: StateInterface = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, status: StatusEnum.request };
        case "FETCH_ERROR":
            return { ...state, status: 'error' };
        case "FETCH_SUCCESS":
            return { ...state, status: 'success' };
        default:
            return state;
    }
};

export default reducer;