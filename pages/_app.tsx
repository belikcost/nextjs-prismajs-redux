import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'
import {applyMiddleware, createStore} from "redux";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
const reducer = (state = {status: 0}, action: { type: any; }) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return {...state, status: 0};
    case "FETCH_ERROR":
      return {...state, status: 404};
    case "FETCH_SUCCESS":
      return {...state, status: 200};
    default:
      return state;
  }
};
const store = createStore(reducer, applyMiddleware(thunk));

function MyApp({ Component, pageProps }: AppProps) {
  return <Provider store={store}><Component {...pageProps} /></Provider>
}
export default MyApp
