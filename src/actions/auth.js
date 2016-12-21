import { cookie } from 'redux-effects-universal-cookie';
import firebase from 'firebase';
import { firebaseAuth, responseToUser } from '../util/firebase';

export function login () {
    return (dispatch) => {
        dispatch({
            type: 'LOG_IN_PENDING',
            pending: true,
        });

        const provider = new firebase.auth.GoogleAuthProvider();
        return firebaseAuth.signInWithPopup(provider).then((response) => {
            const user = responseToUser(response);
            if (user.email.match(/^.*@fffunction.co$/)) {
                dispatch(cookie('user', JSON.stringify(user)));
                dispatch({
                    type: 'LOG_IN_SUCCESS',
                    user,
                });
            } else {
                dispatch({
                    type: 'LOG_IN_ERROR',
                    error: {
                        message: 'You can only log in with a fffunction.co email',
                    },
                });
            }
        }).catch((error) => {
            dispatch({
                type: 'LOG_IN_ERROR',
                error,
            });
        });
    };
}

export function logout () {
    return (dispatch) => {
        dispatch(cookie('user', undefined));
        dispatch({ type: 'LOG_OUT' });
    };
}
