import firebase from 'firebase';
import { firebaseAuth } from '../util/firebase';

export function login () {
    return (dispatch) => {
        dispatch({
            type: 'LOG_IN_PENDING',
            pending: true
        });

        const provider = new firebase.auth.GoogleAuthProvider();
        return firebaseAuth.signInWithPopup(provider).then(function(response) {
            dispatch({
                type: 'LOG_IN_SUCCESS',
                response,
            });
        }).catch(function(error) {
            dispatch({
                type: 'LOG_IN_ERROR',
                error,
            });
        });
    }
};
