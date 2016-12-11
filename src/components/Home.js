import React from 'react';
import { connect } from 'react-redux';

function Home ({ auth }) {
    return (<div>
        <h1>Home</h1>
        <p>Hi, { auth.user.displayName }</p>
        <img src={auth.user.photoURL} role="presentation" />
    </div>);
}

export default connect(state => state)(Home);
