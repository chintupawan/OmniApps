import { Book, APIURL } from "../types/types";

export const updatePageTitle = (bookIndex: number, pageIndex: number, title: string, books: Array<Book>): any => {

    books[bookIndex].sections[0].pages[pageIndex].title = title;
    return books;
};

export const fetchDummyData = (): Promise<any> => {
    // tslint:disable-next-line:no-console
    return fetch(process.env.API_URL + "/Notes").then(r => r.json()).catch(e => console.log(e));
};

export const addNewBook = (newBook: Book, books: Array<Book>): Array<Book> => {
    return books.concat(newBook);
};
