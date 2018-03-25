import { combineReducers } from "redux";
import booksReducer from './booksReducer'; 

export const rootReducer = combineReducers({
    myBooks: booksReducer
});