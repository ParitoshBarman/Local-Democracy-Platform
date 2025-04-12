import { createStore, legacy_createStore, combineReducers } from "redux";
import notificationsReducer from "./notificationsReducer";


const rootReducer = combineReducers({
    notification:notificationsReducer
})


const store = legacy_createStore(rootReducer);

export default store;