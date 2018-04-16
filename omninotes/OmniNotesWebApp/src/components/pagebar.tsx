import * as React from "react";
import { PageProps } from "../types/types";

export default class Pagebar extends React.Component<PageProps, any> {
    constructor(props: any) {
        super(props);
    }
    public render() {
        const { pages } = this.props;
        const pagesLi = pages.map((p, i) => {
            return (
            <li key={i} className="list-group-item">
                <a href="#"><span><i className="omni-icon" data-feather="file" /></span>
                    <span className="omni-book-position-abs">{p.title}</span>
                </a>
            </li>);
        });
        return (
            <ul className="list-group list-group-flush border">
                <li className="list-group-item omni-transparent-back omni-center">
                    <i className="omni-icon" data-feather="plus-circle" />
                </li>
                {pagesLi}
            </ul>
        );
    }
}