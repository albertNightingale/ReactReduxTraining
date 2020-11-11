import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

// redux thunk enabled this
export const signUp = ({ email, password }, callback) => dispatch => {

    axios.post('http://localhost:3090/signup', {email, password})
        .then(response => {
            dispatch({ type: AUTH_USER, payload: response.data.token })
            localStorage.setItem('token', response.data.token)
        })
        .catch( err => dispatch({ type: AUTH_ERROR, payload: 'sign up failed because probably email is in use. ', error: err }))
        .finally(() => callback());
}

export const signOut = () => {
    localStorage.removeItem('token');

    return {
        type: AUTH_USER,
        payload: ''
    };
}

export const signIn = ({ email, password }, callback) => dispatch => {

    axios.post('http://localhost:3090/signin', {email, password})
        .then(response => {
            dispatch({ type: AUTH_USER, payload: response.data.token })
            localStorage.setItem('token', response.data.token)
        })
        .catch( err => dispatch({ type: AUTH_ERROR, payload: 'Invalid Login credentials', error: err }))
        .finally(() => callback());
}
