import React from 'react';
import App from 'components/App';
import { shallow } from 'enzyme';
import CommentBox from 'components/CommentBox';
import CommentList from 'components/CommentList';

let wrapped;

beforeEach(()=> {
    wrapped = shallow(<App/>);

});

it(
    'shows a comment box', 
    () => {

        // return the length of an array of comment box found in App
        expect(wrapped.find(CommentBox).length).toEqual(1);
        
    }
);

it(
    'shows a comment list',
    () => {
        expect(wrapped.find(CommentList).length).toEqual(1);
    }
);