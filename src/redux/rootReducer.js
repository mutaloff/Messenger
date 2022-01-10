import { combineReducers } from "redux";
import { contactReducer } from "./contactReducer";
import { messageReducer } from "./messageReducer";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
    messageReducer,
    contactReducer,
    authReducer
})