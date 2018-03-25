
export type EditorProps = {page: Page, onpageTitleChange:(title: string) => void}
export type PageState = { pages: Array<string> }
export type PageProps = { pages: Array<Page>, onpageSelect:(index:number) => void }

export type NavbarProps = { handleMenuClick: any  };
export type NavbarState = {  };

export type SidebarProps = { books: Array<Book>, onbookSelect: (index: number) => void }

export type MainProps = { myBooks: Array<Book>, changePageTitle:(bookIndex: number, pageIndex:number, pageTitle: string) => void};
export type MainState = { showSidebar: boolean };

export type Page = { title: string, body: string, selfUrl: string, noteTitle: string, sectionTitle: string, relativeLocation: string}
export type Section = { title: string, pages: Array<Page>}
export type Book = {title: string, sections: Array<Section> }

export const FETCH_MYBOOKS = "FETCH_MYBOOKS";
export const SET_PAGETITLE = "SET_PAGETITLE";
