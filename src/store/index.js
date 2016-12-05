import { createStore } from 'redux';

export default createStore(function (state, action) {
    switch (action.type) {
        case 'CHANGE_NAME':
            return {
                name: action.name
            }
        default:
            return {
                authed: false,
            };
    }
});
