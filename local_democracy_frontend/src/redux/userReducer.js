const initialState = {
    user: JSON.parse(localStorage.getItem('user')),
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                user: action.payload.user,
                isAuthenticated: true
            }
        case "LOGOUT":
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('user')
            return {
                ...state,
                accessToken: null,
                refreshToken: null,
                user: null,
                isAuthenticated: false
            }
        case "LOAD_USER":
            let accessToken = localStorage.getItem('accessToken');
            let refreshToken = localStorage.getItem('refreshToken');
            let user = JSON.parse(localStorage.getItem('user'));
            if (accessToken && refreshToken && user) {
                return {
                    ...state,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    user: user,
                    isAuthenticated: true
                }
            }
            else {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('user')
                return {
                    ...state,
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false
                }
            }

        case "VERIFY_USER":
            if (action.payload.user) {
                return {
                    ...state,
                    user: action.payload.user,
                    isAuthenticated: true
                }
            }
            else {
                return state;
            }

        default:
            return state;
    }
}

export default userReducer;