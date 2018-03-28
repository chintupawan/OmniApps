import {FETCH_MYBOOKS,Book} from '../types/types';

const data:Array<Book> = [];
export default (state = data, action:any) => {
    switch(action.type){
        case FETCH_MYBOOKS :
            return action.payload;
    }
    return state;
}