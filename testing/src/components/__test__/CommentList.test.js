import React from 'react';
import { mount } from 'enzyme';
import CommentList from 'components/CommentList';
import ProviderConstruct from 'root'

let wrapped;
const initialState = {
    comments: ['comment 1', 'comment 2']
}; 

beforeEach(()=> {

    wrapped = mount(
            <ProviderConstruct initialState={initialState}>
                <CommentList />
            </ProviderConstruct>
        );
});

afterEach(() => {
    wrapped.unmount();
});

it(
    'creates one LI per comment', 
    () => {
        expect(wrapped.find('li').length).toEqual(2);
    }
);

it(
    'text from each comment is visible', 
    () => {
        expect(initialState.comments.length).toEqual(2); // testing pre-condition
        expect(wrapped.render().text()).toContain(initialState.comments[0]);
        expect(wrapped.render().text()).toContain(initialState.comments[0]);
    }
);




