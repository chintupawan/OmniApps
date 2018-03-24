import * as React from 'react';
type PageState = { pages: Array<string> }

export default class Pagebar extends React.Component<any, PageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            pages: ["Page 1", "Page 2"],
        }
    }
    public render() {
        const { pages } = this.state;
        const pagesLi = pages.map(p => {
            return (<li className="list-group-item">
                <a href="#"><span><i className="omni-icon" data-feather="file"></i></span>
                    <span className="omni-book-position-abs">{p}</span>
                </a>
            </li>);
        })
        return (
            <ul className="list-group list-group-flush border">
                <li className="list-group-item omni-transparent-back omni-center">
                    <i className="omni-icon" data-feather="plus-circle"></i>
                </li>
                {pagesLi}
            </ul>
        );
    }
}