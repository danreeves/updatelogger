import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

function Home ({ auth, dispatch }) {

    const logOut = () => {
        dispatch(logout());
    };

    return (<div>
        <h1>Home</h1>
        <p>Hi, { auth.user.displayName }</p>
        <img src={auth.user.photoURL} role="presentation" height="40" width="40" />
        <button onClick={logOut}>Log out</button>
    </div>);
}

export default connect(state => state)(Home);
