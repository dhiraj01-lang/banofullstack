import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import courseAreaReducer from "./courseArea/courseAreaReducers";
import userReducer from "./users/usersReducers";

const rootReducer = combineReducers({
    User: userReducer,
    CourseArea: courseAreaReducer
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;