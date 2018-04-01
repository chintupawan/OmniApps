import { FETCH_MYBOOKS, Book } from "../types/types";

const data: Array<Book> = [];
export default (state = data, action: any) => {
    // tslint:disable-next-line:switch-default
    switch (action.type) {
        case FETCH_MYBOOKS :
            return {...state, myBooks: action.payload};
    }
    return state;
};