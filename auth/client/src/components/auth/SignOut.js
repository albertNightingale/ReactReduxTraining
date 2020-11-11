import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SignOut extends React.Component {

    componentDidMount() {
        this.props.signOut();
    }

    render() {
        return (        
        <div>
            <h1>Sorry to see u go</h1>
        </div>
        );

    }
}

export default connect(null, actions) (SignOut);