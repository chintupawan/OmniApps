import { SET_PAGETITLE, Page, FETCH_MYBOOKS, Book } from "../types/types";
import { updatePageTitle, fetchDummyData } from "../services/booksService";

export const changePageTitle = (bookIndex:number, pageIndex:number, pageTitle: string, books: Array<Book>) => {
    return (dispatch: any) => {
      dispatch({ type: FETCH_MYBOOKS, payload: updatePageTitle(bookIndex, pageIndex, pageTitle, books) });
    };
  };
export const fetchMyBooks = () => {
  return (dispatch: any) => {
    const data = fetchDummyData();
    dispatch({type: FETCH_MYBOOKS, payload: data});
  }
}