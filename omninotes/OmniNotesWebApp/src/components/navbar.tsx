import * as React from 'react';

type NavbarProps = { handleMenuClick: any  };
type NavbarState = {  };
class Navbar extends React.Component<NavbarProps, NavbarState> {
    // tslint:disable-next-line:no-any
    constructor(props: any) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    private handleMenuClick(){
        this.props.handleMenuClick();
    }
    public render() {
        return (
            <nav className="navbar navbar-light omni-theme-yellow omni-bottom-border">
                <a className="navbar-brand" href="#" onClick={this.handleMenuClick}><i data-feather="menu"></i></a>
                <a className="navbar-brand" href="#">Omni Notes</a>
                <a className="navbar-brand" href="#"><i data-feather="rotate-cw"></i></a>
            </nav>
        );
    }
}

export default Navbar;