import Inferno from 'inferno';
import store from '../store';
import Auth from './Auth';


export default function App ({ children }) {
    const state = store.getState();
    const view = (state.authed) ? <div>{children}</div> : <Auth />;
    return view;
}
