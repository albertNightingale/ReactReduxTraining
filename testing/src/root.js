import React from 'react'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import async from 'middlewares/async'
import reducers from 'reducers'
import stateValidator from 'middlewares/stateValidator'


export default function({ children, initialState = {} }) {
    
    const store = createStore(
        reducers, 
        initialState, 
        applyMiddleware(async, stateValidator)
    );  // the order for apply middle ware does not matter
    
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}