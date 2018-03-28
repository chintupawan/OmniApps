import { combineReducers } from "redux";
import myBooks from './booksReducer'; 
import showLoading from './loadingReducer';

const rootReducer = combineReducers({
    myBooks,
    showLoading
});
export default rootReducer;