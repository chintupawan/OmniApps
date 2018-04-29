import { SET_PAGETITLE, Page, FETCH_MYBOOKS, Book, SHOW_LOADING, NEW_BOOK } from "../types/types";
import { updatePageTitle, fetchBooks, addNewBook } from "../services/booksService";

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
    fetchBooks().then(data => dispatch({ type: FETCH_MYBOOKS, payload: data }))
      .then(dispatch(loading(false)));

  };
};
export const addBook = (newBook: Book) => {
  return (dispatch: any) => {
    dispatch(loading(true));
    addNewBook(newBook).then(data => dispatch({ type: NEW_BOOK, payload: [data] })).then(data => dispatch(loading(false)));
  };
};
export const loading = (load: Boolean) => {
  return (dispatch: any) => {
    dispatch({ type: SHOW_LOADING, payload: load });
  };
};