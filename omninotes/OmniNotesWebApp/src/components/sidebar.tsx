import * as React from 'react';

export default class Sidebar extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            show: false
        }
    }
    public render() {
        return (

            <ul className="list-group list-group-flush">
                <li className="list-group-item omni-transparent-back omni-center">
                    <i className="omni-icon" data-feather="plus-circle"></i>
                </li>
                <li className="list-group-item">
                    <a href="#"><span><i className="omni-icon" data-feather="book"></i></span><span className="omni-book-position-abs">Book 1</span></a>
                    <hr/>
                </li>
                <li className="list-group-item">
                    <a href="#"><span><i className="omni-icon" data-feather="book"></i></span><span className="omni-book-position-abs">Book 2</span></a>
                    <hr/>
                </li>
            </ul>

        );
    }
}