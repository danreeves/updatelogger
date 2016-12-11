import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyCYMWEfIwShOkEy5xMyH6ubpkmhXjxoFtc',
    authDomain: 'inferno-test.firebaseapp.com',
    databaseURL: 'https://inferno-test.firebaseio.com',
    storageBucket: 'inferno-test.appspot.com',
    messagingSenderId: '632818211236',
};

export const firebaseApp = firebase.initializeApp(config);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();

/**
 * Takes an auth response from firebase and
 * returns state object in the shape we want
 * for the store.
 */
export function responseToUser (response) {
    return {
        accessToken: response.credential.accessToken,
        displayName: response.user.displayName,
        email: response.user.email,
        photoURL: response.user.photoURL,
    };
}
