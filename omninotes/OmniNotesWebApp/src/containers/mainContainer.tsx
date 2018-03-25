import * as React from 'react';
import { connect } from "react-redux";
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Editor from '../components/editor';
import Pagebar from '../components/pagebar';
import {MainProps} from '../types/types';
import { changePageTitle } from '../actions/actions';
import { bindActionCreators } from 'redux';

class MainContainer extends React.Component<MainProps, any> {

    constructor(props: any) {
        super(props);
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.onbookSelect = this.onbookSelect.bind(this);
        this.onpageSelect = this.onpageSelect.bind(this);
        this.onpageTitleChange = this.onpageTitleChange.bind(this);

        this.state = {
            showSidebar: false,
            selectedBookIndex: 0,
            selectedPageIndex: 0
        }
    }

    private toggleSidebar() {
        const { showSidebar } = this.state;
        this.setState({ showSidebar: !showSidebar })
    }
    private onbookSelect(bookIndex:number): void{
        this.setState({selectedBookIndex: bookIndex, selectedPageIndex: 0});
    }
    private onpageSelect(pageIndex:number):void{
        this.setState({selectedPageIndex: pageIndex});
    }
    private onpageTitleChange(title: string): void {
        const{selectedBookIndex, selectedPageIndex} = this.state;
        this.props.changePageTitle(selectedBookIndex, selectedPageIndex, title);
    }

    public render() {
        const{ myBooks } = this.props;
        const { showSidebar, selectedBookIndex, selectedPageIndex } = this.state
        const sidebarWidth = {
            width:250+'px'
        }
        const selectedPage = myBooks[selectedBookIndex].sections[0].pages[selectedPageIndex];
        const pagesOfSelectedBook = myBooks[selectedBookIndex].sections[0].pages;
        return (
            <div>
                <div style={showSidebar ? sidebarWidth : {}} className="omni-sidebar">
                    <Sidebar books={myBooks} onbookSelect={this.onbookSelect}/>
                </div>
                <div className={showSidebar ? "omni-workspace-shift" :"omni-workspace"}>
                    <header>
                        <Navbar handleMenuClick={this.toggleSidebar} />
                    </header>
                    <div className="container-fluid">
                        <div className="row omni-margin-top10">
                            <div className="col-sm-10 border">
                                <Editor page={selectedPage} onpageTitleChange={this.onpageTitleChange}/>
                            </div>
                            <div className="col-sm-2">
                                <Pagebar pages={pagesOfSelectedBook} onpageSelect={this.onpageSelect}/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state: any) {
    return {
        myBooks: state.myBooks,
    };
}
function mapDispatchToProps(dispatch:any){
    return bindActionCreators({changePageTitle}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
