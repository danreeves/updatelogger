import React from 'react';
import { connect } from 'react-redux';
import Auth from './Auth';


function App ({ authed, children }) {
    return (authed) ? <div>{children}</div> : <Auth />;
}

export default connect(state => state.auth)(App);
