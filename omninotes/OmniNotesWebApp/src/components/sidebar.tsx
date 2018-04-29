import * as React from "react";
import { SidebarProps, SidebarState } from "../types/types";
import NewItem from "./reusables/newItem";

export default class Sidebar extends React.Component<SidebarProps, SidebarState> {
    constructor(props: SidebarProps) {
        super(props);
        this.state = {
            books: [],
            editMode: false
        };
        this.selectBook = this.selectBook.bind(this);
        this.onlocalAddBook = this.onlocalAddBook.bind(this);
        this.onaddNewBook = this.onaddNewBook.bind(this);
    }

    public componentWillReceiveProps(nextProps: SidebarProps) {
        if (this.props !== nextProps) {
            this.setState({ books: nextProps.books });
        }
    }

    public render() {
        const { books } = this.state;
        if (!books) {
            return (<div />);
        }
        const booksLi = books.map((b, i) => {
            return (
                <li key={i} className="list-group-item">
                    <a href="#" onClick={() => this.selectBook(i)}>
                        <span><i className="omni-icon" data-feather="book" /></span>
                        {b.editMode ? <input type="text" name="book" onBlur={(e) => this.onaddNewBook(i, e)} defaultValue={b.title} /> : <span className="omni-book-position-abs">{b.title}</span>}
                    </a>
                    <hr />
                </li>);
        });
        return (
            <div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item omni-transparent-back omni-center">
                        <a href="#" onClick={() => this.onlocalAddBook()} >
                            <i className="omni-icon" data-feather="plus-circle" /> Add new book
                        </a>
                    </li>
                    {booksLi}
                </ul>
            </div>
        );
    }
    private onaddNewBook(id: number, e: any) {
        const { books } = this.state;
        books[id].editMode = false;
        books[id].title = e.target.value;
        this.setState({ books });
        this.props.onaddNewBook(books[id]);
    }
    private selectBook(index: number) {
        this.props.onbookSelect(index);
    }
    private addEditBook(id: number) {
        this.setState({ editMode: true });
    }
    private onlocalAddBook() {
        const newBook = {
            "title": "Untitled Book",
            "editMode": true,
            "sections": [
                {
                    "title": "UntitledSection",
                    "pages": [
                        {
                            "createDateTime": "",
                            "lastModifiedDateTime": "",
                            "title": "Untitled Page",
                            "body": "",
                            "selfUrl": "",
                            "noteTitle": "Untitled",
                            "sectionTitle": "UntitledSection",
                            "relativeLocation": ""
                        }
                    ],
                    "selfUrl": ""
                }
            ],
            "selfUrl": ""
        };
        const { books } = this.state;
        books.push(newBook);
        this.setState({ books: books, editMode: true});
    }
}