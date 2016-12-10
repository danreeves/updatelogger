const defaultAuth = {
    pending: false,
    authed: false,
    user: {},
    error: '',
};

export default function auth (oldState = defaultAuth, action) {
    switch (action.type) {
        case 'LOG_IN_PENDING':
            return {
                ...oldState,
                pending: action.pending,
            };
        case 'LOG_IN_SUCCESS':
            return {
                ...oldState,
                authed: true,
                user: action.user,
            };
        case 'LOG_IN_ERROR':
            return {
                ...oldState,
                pending: false,
                error: action.error.message,
            }
        default:
            return { ...oldState };
    }
}
