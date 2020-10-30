import stateSchema from './stateSchema'

export default ({ dispatch, getState}) => next => action => {
    next(action); // immediatly going next

    // after it has hit the reducer, check the state to ensure that the redux state is valid
    
    stateSchema.isValid(getState()).then( response => console.log(response) );
};