import { SEND_ARRAY_ERROR, SEND_ARRAY_REQUEST, SEND_ARRAY_SUCCESS } from "../constants";


const sendArraySuccess = () => ({ type: SEND_ARRAY_SUCCESS });
const sendArrayRequest = () => ({ type: SEND_ARRAY_REQUEST });
const sendArrayError = () => ({ type: SEND_ARRAY_ERROR });

export { sendArrayError, sendArraySuccess, sendArrayRequest };