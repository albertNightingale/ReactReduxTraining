import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers'; 
import App from './components/App';
import Feature from './components/Feature';
import Welcome from './components/Welcome';
import SignUp from './components/auth/SignUp';
import SignOut from './components/auth/SignOut'; 
import SignIn from './components/auth/SignIn';

const store = createStore(
    reducers,  // reducers
    {}, // initial state
    applyMiddleware(reduxThunk) // middleware
)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App>
                <Route path="/" exact component={Welcome} />
                <Route path="/Signup" exact component={SignUp} />
                <Route path="/feature" exact component={Feature} />
                <Route path="/Signout" exact component={SignOut} />
                <Route path="/Signin" exact component={SignIn} />
            </App>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
); 