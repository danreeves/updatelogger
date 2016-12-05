import Inferno from 'inferno';
import { firebaseAuth } from '../firebase';
import firebase from 'firebase';

function signIn () {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebaseAuth.signInWithRedirect(provider);
}

export default function Auth () {
    firebaseAuth.getRedirectResult().then(function(result) {
        console.log(result);
    }).catch(function(error) {
        console.log(error);
    });
    return (
        <div>
            <button onClick={signIn}>Sign in with Google</button>
        </div>
    );
}
