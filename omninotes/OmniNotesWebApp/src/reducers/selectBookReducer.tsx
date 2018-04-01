import { SELECT_BOOK, SELECT_PAGE, Book } from "../types/types";

export default (state = {}, action: any) => {
    // tslint:disable-next-line:switch-default
    switch (action.type) {
        case SELECT_BOOK:
            return  { ...state, selectedBookIndex: action.payload};
        case SELECT_PAGE:
            return { ...state, selectedPageIndex: action.payload};
    }
    return state;
};