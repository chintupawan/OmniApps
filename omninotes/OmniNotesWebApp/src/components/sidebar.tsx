import * as React from 'react';
import {SidebarProps} from '../types/types';

export default class Sidebar extends React.Component<SidebarProps, any> {
    constructor(props: SidebarProps) {
        super(props);
        this.selectBook = this.selectBook.bind(this);
    }
    private selectBook(index:number) {
        this.props.onbookSelect(index);
    }
    public render() {
        const { books } = this.props;
        const booksLi = books.map((b, i) => {
            return (<li key={i} className="list-group-item">
                         <a  href="#" onClick={() => this.selectBook(i)}><span><i className="omni-icon" data-feather="book"></i></span>
                                    <span className="omni-book-position-abs">{b.title}</span>
                        </a>
                         <hr />
                     </li>)
        })
        return (
            <ul className="list-group list-group-flush">
                <li className="list-group-item omni-transparent-back omni-center">
                    <i className="omni-icon" data-feather="plus-circle"></i>
                </li>
                {booksLi}
            </ul>

        );
    }
}