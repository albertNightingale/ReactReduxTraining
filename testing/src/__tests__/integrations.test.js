import React from 'react';
import { mount } from 'enzyme';
import Root from 'Root';
import App from 'components/App';
import moxios from 'moxios';

beforeEach(() => {
    moxios.install();

    // intercept the request with another request
    moxios.stubRequest("http://jsonplaceholder.typicode.com/comments", {
        status: 200,
        response: [
            {name: 'Fetched #1'},
            {name: 'Fetched #2'}
        ]
    }); 
});

afterEach(() => {
    moxios.uninstall();
});

it ('can fetch a list of comments and display them', (done) => {

    // Attempt to render the entire app
    const wrapped = mount(
        <Root>
            <App /> 
        </Root>
    );

    // find the fetch button and click it
    wrapped.find('.fetch-comments').simulate('click');

    // wait until the request had been approved
    // expect to find a list of comments!!
    moxios.wait(() => {
        wrapped.update();

        expect(wrapped.find('li').length).toEqual(2);

        done(); // when we call done function, indicates that we are done. 

        wrapped.unmount();
    });
});
