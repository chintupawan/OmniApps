"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var navbar_1 = require("../components/navbar");
var sidebar_1 = require("../components/sidebar");
var editor_1 = require("../components/editor");
var pagebar_1 = require("../components/pagebar");
var MainContainer = /** @class */ (function (_super) {
    __extends(MainContainer, _super);
    function MainContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.toggleSidebar = _this.toggleSidebar.bind(_this);
        _this.state = {
            showSidebar: false,
            books: ["Book 1", "Book 2", "Book 3"]
        };
        return _this;
    }
    MainContainer.prototype.toggleSidebar = function () {
        var showSidebar = this.state.showSidebar;
        this.setState({ showSidebar: !showSidebar });
    };
    MainContainer.prototype.render = function () {
        var showSidebar = this.state.showSidebar;
        var sidebarWidth = {
            width: 250 + 'px'
        };
        return (React.createElement("div", null,
            React.createElement("div", { style: showSidebar ? sidebarWidth : {}, className: "omni-sidebar" },
                React.createElement(sidebar_1.default, { books: this.state.books })),
            React.createElement("div", { className: showSidebar ? "omni-workspace-shift" : "omni-workspace" },
                React.createElement("header", null,
                    React.createElement(navbar_1.default, { handleMenuClick: this.toggleSidebar })),
                React.createElement("div", { className: "container-fluid" },
                    React.createElement("div", { className: "row omni-margin-top10" },
                        React.createElement("div", { className: "col-sm-10 border" },
                            React.createElement(editor_1.default, null)),
                        React.createElement("div", { className: "col-sm-2" },
                            React.createElement(pagebar_1.default, null)))))));
    };
    return MainContainer;
}(React.Component));
exports.default = MainContainer;
//# sourceMappingURL=mainContainer.js.map