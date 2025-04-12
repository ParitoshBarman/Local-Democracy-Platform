function notificationsReducer(state=[], action){
    switch(action.type){
        case "ADD_NOTIFICATION":
            return [action.payload, ...state];
        default:
            return state;
    }
}

export default notificationsReducer;