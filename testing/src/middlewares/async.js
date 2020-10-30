// boilet plate for middleware function
export default ({ dispatch }) => next => action => 
{
    // check to see if the action has a promise on its payload property. 
    // Its payload will be the promise if a request has not yet received its data

    if (!action.payload || !action.payload.then) 
    {   // if not then send the action on the next middleware
        return next(action);
    }
    else    // if it does, wait for it to resolve
    {
        // wait for the promise to resolve
        action.payload.then(function (response) {

            // create a new action with that data and dispatch it 
            const newAction = {
                ...action, payload: response
            };
            dispatch(newAction);
        });

    }
        
}


        /*
        export default function({ dispatch }) {
            return function(next) { // next is for the next middleware
                return function(action) {
        
                }
            }
        }
        */
