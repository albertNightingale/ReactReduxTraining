import React from 'react'
import ReactDOM from 'react-dom'
import ProviderConstruct from 'root'
import App from 'components/App'
import {BrowserRouter, Route} from 'react-router-dom'

ReactDOM.render(
    <ProviderConstruct>
        <BrowserRouter>
            <Route path="/" component={App} />
        </BrowserRouter>        
    </ProviderConstruct>,
    document.querySelector('#root')
)