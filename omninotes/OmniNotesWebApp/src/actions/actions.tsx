import { SET_PAGETITLE, Page, FETCH_MYBOOKS, Book, SHOW_LOADING } from "../types/types";
import { updatePageTitle, fetchDummyData } from "../services/booksService";

export const changePageTitle = (bookIndex: number, pageIndex: number, pageTitle: string, books: Array<Book>) => {
  return (dispatch: any) => {
    dispatch(loading(true));
    dispatch({ type: FETCH_MYBOOKS, payload: updatePageTitle(bookIndex, pageIndex, pageTitle, books) });
    dispatch(loading(false));
  };
};
export const fetchMyBooks = () => {
  return (dispatch: any) => {
    dispatch(loading(true));
    const data = fetchDummyData();
    dispatch({ type: FETCH_MYBOOKS, payload: data });
    dispatch(loading(false));
  };
};
export const loading = (load: Boolean) => {
  return (dispatch: any) => {
    dispatch({ type: SHOW_LOADING, payload: load });
  };
};