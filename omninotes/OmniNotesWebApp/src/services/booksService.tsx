import { Book } from "../types/types";

let url = process.env.API_URL;
export const updatePageTitle = (bookIndex: number, pageIndex: number, title: string, books: Array<Book>): any => {

    books[bookIndex].sections[0].pages[pageIndex].title = title;
    return books;
};

export const fetchBooks = (): Promise<any> => {
    // tslint:disable-next-line:no-console
    return fetch(`${url}/Notes`).then(r => r.json()).catch(e => console.log(e));
};

export const addNewBook = (newBook: Book): Promise<any> => {
    // tslint:disable-next-line:no-console
    console.log("Creating a new book with title " + newBook.title);
    return fetch(`${url}/Notes/${newBook.title}`, {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
    // tslint:disable-next-line:no-console
    }).then(resp => resp.json()).catch(e => console.log(e));
};
