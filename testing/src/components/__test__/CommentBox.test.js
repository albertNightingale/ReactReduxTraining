import React from 'react';
import { mount } from 'enzyme';
import CommentBox from 'components/CommentBox';
import ProviderConstruct from 'root'

let wrapped;

beforeEach(()=> {
    wrapped = mount(
            <ProviderConstruct>
                <CommentBox />
            </ProviderConstruct>
        );

});

afterEach(() => {
    wrapped.unmount();
});

it(
    'has a textarea & a button', 
    () => {

        // return the length of an array of comment box found in App
        expect(wrapped.find('textarea').length).toEqual(1);
        expect(wrapped.find('button').length).toEqual(2);
    }
);

describe('the textarea', () => {
    beforeEach(() => {

        // simulate the change event
        wrapped.find('textarea').simulate('change', {
            target: {value: 'new comment'}
        });

        wrapped.update();
    })
    
    it(
        'has a text area that the user can type in',
        () => {
            expect(wrapped.find('textarea').prop('value')).toEqual('new comment')        
        }
    )
    
    it (
        'has empty textarea when button is pressed', 
        () => {    
            // simulate the submit event of the form
            wrapped.find('form').simulate('submit', {
                target: {value: ''}
            })
    
            wrapped.update();
    
            expect(wrapped.find('textarea').prop('value')).toEqual('')
        }
    )
})


