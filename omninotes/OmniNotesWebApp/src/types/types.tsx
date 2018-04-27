
export type EditorProps = { page: Page, onpageTitleChange: (title: string) => void };
export type PageState = { pages: Array<string> };
export type PageProps = { pages: Array<Page>, onpageSelect: (index: number) => void };

export type NavbarProps = { handleMenuClick: any };
export type NavbarState = {};

export type SidebarProps = { books: Array<Book>, onbookSelect: (index: number) => void, onaddNewBook: () => void; };
export type SidebarState = { books: Array<Book>, editMode: Boolean };

export type MainProps = {
  myBooks: Array<Book>, showLoading: Boolean
  changePageTitle: (bookIndex: number, pageIndex: number, pageTitle: string, books: Array<Book>)
    => void,
  fetchMyBooks: () => void
};
export type MainState = { showSidebar: boolean };

// tslint:disable-next-line:max-line-length
export type Page = { title: string, body: string, selfUrl: string, noteTitle: string, sectionTitle: string, relativeLocation: string };
export type Section = { title: string, pages: Array<Page> };
export type Book = { title: string, sections: Array<Section> };

export const FETCH_MYBOOKS = "FETCH_MYBOOKS";
export const SET_PAGETITLE = "SET_PAGETITLE";
export const SHOW_LOADING = "SHOW_LOADING";
export const SELECT_BOOK = "SELECT_BOOK";
export const SELECT_PAGE = "SELECT_PAGE";
export const APIURL = "http://localhost/omninotes/api";
