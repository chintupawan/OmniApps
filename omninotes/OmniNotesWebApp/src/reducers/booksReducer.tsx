import {FETCH_MYBOOKS, SET_PAGETITLE, Book} from '../types/types';
import { fetchDummyData } from '../services/booksService';
const data:Array<Book> =fetchDummyData();

export default (state = data, action:any) => {
    switch(action.type){
        case FETCH_MYBOOKS :
            return action.payload;
    }
    return state;
}