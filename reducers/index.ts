import { Action } from "redux";


const INITIAL_STATE = { status: 0 };

const reducer = (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, status: 0 };
        case "FETCH_ERROR":
            return { ...state, status: 404 };
        case "FETCH_SUCCESS":
            return { ...state, status: 200 };
        default:
            return state;
    }
};

export default reducer;