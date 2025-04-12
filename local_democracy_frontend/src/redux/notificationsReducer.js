function notificationsReducer(state = [], action) {
    switch (action.type) {
        case "ADD_NOTIFICATION":
            let isdataExist = state.some((itm) => itm.id == action.payload.id)
            if (!isdataExist) {
                return [action.payload, ...state];
            }
            else {
                return state;
            }
        default:
            return state;
    }
}

export default notificationsReducer;