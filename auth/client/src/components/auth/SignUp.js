import React from 'react';
import {reduxForm, Field} from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions'

class SignUp extends React.Component {


    onSubmit = formProps => {
        this.props.signUp(formProps, () => {
            this.props.history.push('/feature'); // redirect to route
        });
    }

    render() {

        // passing in the props into the handleSubmit value so onSubmit can use it
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <fieldset>
                    <label>Email</label>
                    <Field
                        name="email"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                </fieldset>
                <fieldset>
                    <label>Password</label>
                    <Field
                        name="password"
                        type="password"
                        component="input"
                        autoComplete="none"
                    />
                </fieldset>
                <div>
                    {this.props.errorMessage}
                </div>
                <button>Sign Up!</button>
            </form>
        )
    }    
}

function mapStateToProps(state) {
    return {errorMessage: state.auth.errorMessage};
}

// compose allows wrapping one HOC around another to maintain the nice syntax
export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signUp' })
)(SignUp);

