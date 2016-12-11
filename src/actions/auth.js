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
        return firebaseAuth.signInWithPopup(provider).then(function(response) {
            const user = responseToUser(response);
            dispatch(cookie('user', JSON.stringify(user)));
            dispatch({
                type: 'LOG_IN_SUCCESS',
                user,
            });
        }).catch(function(error) {
            console.log(error)
            dispatch({
                type: 'LOG_IN_ERROR',
                error,
            });
        });
    }
};
