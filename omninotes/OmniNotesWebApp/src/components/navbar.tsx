import * as React from "react";
import { NavbarProps, NavbarState } from "../types/types";

class Navbar extends React.Component<NavbarProps, any> {
    // tslint:disable-next-line:no-any
    constructor(props: NavbarProps) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }
    public render() {
        return (
            <nav className="navbar navbar-light omni-theme-yellow omni-bottom-border">
                <a className="navbar-brand" href="#" onClick={this.handleMenuClick}><i data-feather="menu" />Menu</a>
                <a className="navbar-brand" href="#">Omni Notes</a>
                <a className="navbar-brand" href="#"><i data-feather="rotate-cw" />Refresh</a>
            </nav>
        );
    }
    
    private handleMenuClick() {
        this.props.handleMenuClick();
    }
}

export default Navbar;