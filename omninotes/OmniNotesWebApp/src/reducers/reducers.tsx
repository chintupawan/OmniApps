import { combineReducers } from "redux";
import myBooks from './booksReducer'; 

const rootReducer = combineReducers({
    myBooks
});
export default rootReducer;