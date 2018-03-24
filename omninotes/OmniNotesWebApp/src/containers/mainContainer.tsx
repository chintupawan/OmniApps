import * as React from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Editor from '../components/editor';
import Pagebar from '../components/pagebar';

type MainProps = {};
type MainState = { showSidebar: boolean, books:Array<string> };

class MainContainer extends React.Component<MainProps, MainState> {

    constructor(props: any) {
        super(props);
        this.toggleSidebar = this.toggleSidebar.bind(this);

        this.state = {
            showSidebar: false,
            books:["Book 1", "Book 2", "Book 3"]
        }
    }

    private toggleSidebar() {
        const { showSidebar } = this.state;
        this.setState({ showSidebar: !showSidebar })
    }

    public render() {
        const { showSidebar } = this.state
        const sidebarWidth = {
            width:250+'px'
        }
        return (
            <div>
                <div style={showSidebar ? sidebarWidth : {}} className="omni-sidebar">
                    <Sidebar books={this.state.books}/>
                </div>
                <div className={showSidebar ? "omni-workspace-shift" :"omni-workspace"}>
                    <header>
                        <Navbar handleMenuClick={this.toggleSidebar} />
                    </header>
                    <div className="container-fluid">
                        <div className="row omni-margin-top10">
                            <div className="col-sm-10 border">
                                <Editor />
                            </div>
                            <div className="col-sm-2">
                                <Pagebar />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainContainer;