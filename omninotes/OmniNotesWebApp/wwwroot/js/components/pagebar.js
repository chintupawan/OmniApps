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
var Pagebar = /** @class */ (function (_super) {
    __extends(Pagebar, _super);
    function Pagebar(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            pages: ["Page 1", "Page 2"],
        };
        return _this;
    }
    Pagebar.prototype.render = function () {
        var pages = this.state.pages;
        var pagesLi = pages.map(function (p) {
            return (React.createElement("li", { className: "list-group-item" },
                React.createElement("a", { href: "#" },
                    React.createElement("span", null,
                        React.createElement("i", { className: "omni-icon", "data-feather": "file" })),
                    React.createElement("span", { className: "omni-book-position-abs" }, p))));
        });
        return (React.createElement("ul", { className: "list-group list-group-flush border" },
            React.createElement("li", { className: "list-group-item omni-transparent-back omni-center" },
                React.createElement("i", { className: "omni-icon", "data-feather": "plus-circle" })),
            pagesLi));
    };
    return Pagebar;
}(React.Component));
exports.default = Pagebar;
//# sourceMappingURL=pagebar.js.map