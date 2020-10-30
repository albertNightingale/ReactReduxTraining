import { Route, Link } from 'react-router-dom';
import * as actions from "actions";
import {connect} from 'react-redux';
import React from 'react';
import CommentBox from 'components/CommentBox';
import CommentList from 'components/CommentList';

class App extends React.Component 
{
    // render the header
    renderHeader() {
        return (<ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/post">Post</Link>
            </li>
            <li>
                {this.renderSignInButton()}
            </li>
        </ul>
        )
    }

    renderSignInButton() {
        const signIn = "Sign In";
        const signOut = "Sign Out";

        return (
            <button onClick={() => this.props.changeAuth(!this.props.auth)}>
                {this.props.auth?signOut:signIn}
            </button>)
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                <Route path="/post" exact component={CommentBox} />
                <Route path="/" exact component={CommentList} />
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {auth : state.auth};
};

export default connect(mapStateToProps, actions)(App);