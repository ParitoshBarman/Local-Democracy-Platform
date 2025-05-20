import { createStore, legacy_createStore, combineReducers } from "redux";
import notificationsReducer from "./notificationsReducer";
import userReducer from "./userReducer";


const rootReducer = combineReducers({
    notification:notificationsReducer,
    user:userReducer
})


const store = legacy_createStore(rootReducer);

export default store;