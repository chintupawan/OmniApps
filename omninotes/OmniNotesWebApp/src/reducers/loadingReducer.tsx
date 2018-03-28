import {FETCH_MYBOOKS, SET_PAGETITLE, Book, SHOW_LOADING} from '../types/types';

export default (state = true, action:any) => {
    switch(action.type){
        case SHOW_LOADING:
            return  action.payload
    }
    return state;
}