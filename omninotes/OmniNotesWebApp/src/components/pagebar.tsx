import * as React from 'react';

export default class Pagebar extends React.Component {
    constructor(props: any) {
        super(props);
    }
    public render() {
        return (
            <ul className="list-group list-group-flush border">
                <li className="list-group-item omni-transparent-back omni-center">
                    <i className="omni-icon" data-feather="plus-circle"></i>
                </li>
                <li className="list-group-item">
                    <a href="#"><span><i className="omni-icon" data-feather="file"></i></span>
                                <span className="omni-book-position-abs">Page 1</span>
                    </a>
                </li>
                <li className="list-group-item">
                    <a href="#"><span><i className="omni-icon" data-feather="file"></i></span><span className="omni-book-position-abs">Page 2</span></a>
                </li>
            </ul>
        );
    }
}