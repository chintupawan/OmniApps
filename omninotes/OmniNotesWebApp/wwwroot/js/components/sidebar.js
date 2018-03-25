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
var Sidebar = /** @class */ (function (_super) {
    __extends(Sidebar, _super);
    function Sidebar(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            show: false
        };
        return _this;
    }
    Sidebar.prototype.render = function () {
        var books = this.props.books;
        var booksLi = books.map(function (b) {
            return (React.createElement("li", { className: "list-group-item" },
                React.createElement("a", { href: "#" },
                    React.createElement("span", null,
                        React.createElement("i", { className: "omni-icon", "data-feather": "book" })),
                    React.createElement("span", { className: "omni-book-position-abs" }, b)),
                React.createElement("hr", null)));
        });
        return (React.createElement("ul", { className: "list-group list-group-flush" },
            React.createElement("li", { className: "list-group-item omni-transparent-back omni-center" },
                React.createElement("i", { className: "omni-icon", "data-feather": "plus-circle" })),
            booksLi));
    };
    return Sidebar;
}(React.Component));
exports.default = Sidebar;
//# sourceMappingURL=sidebar.js.map