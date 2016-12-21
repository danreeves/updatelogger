import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Title = styled.h1`
    color: red;
`;

function Home ({ auth, dispatch }) {

    const logOut = () => {
        dispatch(logout());
    };

    return (<div>
        <nav>
            <Title>Update Logger</Title>
            <img src={auth.user.photoURL} role="presentation" height="40" width="40" />
            <p>Hi, { auth.user.displayName }</p>
            <button onClick={logOut}>Log out</button>
        </nav>
    </div>);
}

export default connect(state => state)(Home);
