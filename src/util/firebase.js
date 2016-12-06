import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyCYMWEfIwShOkEy5xMyH6ubpkmhXjxoFtc',
    authDomain: 'inferno-test.firebaseapp.com',
    databaseURL: 'https://inferno-test.firebaseio.com',
    storageBucket: 'inferno-test.appspot.com',
    messagingSenderId: '632818211236'
};

export const firebaseApp = firebase.initializeApp(config);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();
