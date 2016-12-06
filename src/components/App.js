import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import Auth from './Auth';


function App ({ authed, children }) {
    return (authed) ? <div>{children}</div> : <Auth></Auth>;
}

export default connect(state => state.auth)(App);
