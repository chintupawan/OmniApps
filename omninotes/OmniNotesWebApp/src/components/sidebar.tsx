import * as React from "react";
import { SidebarProps } from "../types/types";
import NewItem from "./reusables/newItem";

export default class Sidebar extends React.Component<SidebarProps, any> {
    constructor(props: SidebarProps) {
        super(props);
        this.selectBook = this.selectBook.bind(this);
    }

    public render() {
        const { books } = this.props;
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
                        // tslint:disable-next-line:max-line-length
                        <a href="#" data-toggle="modal" data-target="#exampleModal">
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

    private renderModal() {
        return (
            // tslint:disable-next-line:max-line-length
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
                            ...
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