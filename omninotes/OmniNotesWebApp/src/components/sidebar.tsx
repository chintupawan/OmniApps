import * as React from 'react';

type SidebarProps = { books: Array<string> }
export default class Sidebar extends React.Component<SidebarProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            show: false
        }
    }
    public render() {
        const { books } = this.props;
        const booksLi = books.map(b => {
            return (<li className="list-group-item">
                <a href="#"><span><i className="omni-icon" data-feather="book"></i></span><span className="omni-book-position-abs">{b}</span></a>
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