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
                        <span className="omni-book-position-abs">{b.title}</span>
                    </a>
                    <hr />
                </li>);
        });
        return (
            <div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item omni-transparent-back omni-center">
                        <a href="#" >
                            <i className="omni-icon" data-feather="plus-circle" />
                        </a>
                    </li>
                    {booksLi}
                </ul>
                {this.renderModal()}
            </div>
        );
    }
    private selectBook(index: number) {
        this.props.onbookSelect(index);
    }

    private renderNewBook() {
        const newBook = {
            "title": "Untitled",
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

    private renderModal() {
        return (
            <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <input type="text" name="newBook" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}