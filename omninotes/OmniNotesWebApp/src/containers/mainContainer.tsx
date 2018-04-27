import * as React from "react";
import { connect } from "react-redux";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Editor from "../components/editor";
import Pagebar from "../components/pagebar";
import { MainProps, Book } from "../types/types";
import { changePageTitle, fetchMyBooks } from "../actions/actions";

class MainContainer extends React.Component<MainProps, any> {

    constructor(props: any) {
        super(props);
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.onbookSelect = this.onbookSelect.bind(this);
        this.onpageSelect = this.onpageSelect.bind(this);
        this.onpageTitleChange = this.onpageTitleChange.bind(this);
        this.onaddNewBook = this.onaddNewBook.bind(this);
        this.state = {
            showSidebar: false,
            selectedBookIndex: 0,
            selectedPageIndex: 0,
            books: [],
            loading: true
        };
    }

    public componentWillMount() {
       this.props.fetchMyBooks();
    }

    public componentWillReceiveProps(nextProps: any) {
       this.setState({books: nextProps.myBooks, loading: nextProps.showLoading});
    }
    public render() {
        // const{ myBooks, showLoading } = this.props;
        const { showSidebar, selectedBookIndex, selectedPageIndex, loading } = this.state;
        const books = this.state.books.myBooks;
        const sidebarWidth = {
            width: 250 + "px"
        };
        if (loading || !books || books.length === 0 || !books[selectedBookIndex]) {
            return(
                <div>loading...</div>
            );
        }
       
        const selectedPage = books[selectedBookIndex].sections[0].pages[selectedPageIndex];
        const pagesOfSelectedBook = books[selectedBookIndex].sections[0].pages;
        return (
            <div>
                <div style={showSidebar ? sidebarWidth : {}} className="omni-sidebar">
                    <Sidebar books={books} onbookSelect={this.onbookSelect} onaddNewBook={this.onaddNewBook}/>
                </div>
                <div className={showSidebar ? "omni-workspace-shift" : "omni-workspace"}>
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

    private toggleSidebar() {
        const { showSidebar } = this.state;
        this.setState({ showSidebar: !showSidebar });
    }
    private onbookSelect(bookIndex: number): void {
        this.setState({selectedBookIndex: bookIndex, selectedPageIndex: 0});
    }
    private onpageSelect(pageIndex: number): void {
        this.setState({selectedPageIndex: pageIndex});
    }
    private onpageTitleChange(title: string): void {
        const{selectedBookIndex, selectedPageIndex} = this.state;
        this.props.changePageTitle(selectedBookIndex, selectedPageIndex, title, this.props.myBooks);
    }
    private onaddNewBook() {
        const newBook = {
            "title": "Untitled Book",
            "sections": [
                {
                    "title": "UntitledSection",
                    "pages": [
                        {
                            "createDateTime": "",
                            "lastModifiedDateTime": "",
                            "title": "Untitled Page",
                            "body": "",
                            "selfUrl": "",
                            "noteTitle": "Untitled",
                            "sectionTitle": "UntitledSection",
                            "relativeLocation": ""
                        }
                    ],
                    "selfUrl": ""
                }
            ],
            "selfUrl": ""
        };
        const { books } = this.state;
        books.myBooks.push(newBook);
        this.setState({ books: books, editMode: true});
    }
}
function mapStateToProps(state: any) {
    return {
        myBooks: state.myBooks,
        showLoading: state.showLoading
    };
}

export default connect(mapStateToProps, {fetchMyBooks, changePageTitle})(MainContainer);
