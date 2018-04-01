import { combineReducers } from "redux";
import myBooks from "./booksReducer"; 
import showLoading from "./loadingReducer";
import selected from "./selectBookReducer";

const rootReducer = combineReducers({
    myBooks,
    showLoading,
    selected,
});
export default rootReducer;