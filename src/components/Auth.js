import Inferno from 'inferno'
import { connect } from 'inferno-redux';
import { login } from '../actions/auth';

function Auth ({ error, pending, dispatch }) {

    const signIn = () => {
        dispatch(login());
    }

    const err = (error.length) ? <p>{error}</p> : null;

    return (
        <div>
            {(pending) ?
                <p>Logging in...</p>
            :
                <div>
                    <button onClick={signIn}>Sign in with Google</button>
                    {err}
                </div>
            }
        </div>
    );
}

export default connect(state => state.auth)(Auth);
