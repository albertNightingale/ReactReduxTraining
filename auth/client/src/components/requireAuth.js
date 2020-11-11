import React from 'react';
import * as actions from '../actions';
import {connect} from 'react-redux';

export default (ChildComponent, redirectLink) => {
    class ComposedComponent extends React.Component {
        
        // when component is mounted/created
        componentDidMount() {
            this.shouldNavigateAway();
        }

        // when component is updated
        componentDidUpdate() {
            this.shouldNavigateAway();
        }

        shouldNavigateAway() {
            if (!this.props.auth) // if not authenticated, redirect back to the home page
            {
                // leave and navigate back to the home page
                this.props.history.push(redirectLink);
            }
        }
        
        render() {
            // pass the parent props and pass to the child
            return <ChildComponent {...this.props} />;
        }
    }

    const mapStateToProps = state => {
        return { auth: state.auth.authenticated };
    }
    return connect(mapStateToProps, actions)(ComposedComponent);
}; 