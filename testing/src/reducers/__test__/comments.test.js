import commentsReducer from 'reducers/comments'
import {SAVE_COMMENT} from 'actions/types'

it ('handles actions of type SAVE_COMMENT', () => {
    
    // creates a fake action
    const action = {
        type: SAVE_COMMENT,
        comment: 'New Comment'
    };

    // calls the commentsReducer (the function used for the test)
    // to get the state. 

    const newState = commentsReducer([], action);

    // test the state against the expectation
    expect(newState).toEqual(['New Comment']);
});


it ('handles actions of unknown type', () => {
    
    // creates a fake action
    const invalidAction = {
        type: 'sgdkakd',
        comment: 'New Comment'
    };

    // calls the commentsReducer (the function used for the test)
    // to get the state. 

    const newState = commentsReducer([], invalidAction);

    // test the state against the expectation
    expect(newState).toEqual([]);
});