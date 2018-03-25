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
var Navbar = /** @class */ (function (_super) {
    __extends(Navbar, _super);
    // tslint:disable-next-line:no-any
    function Navbar(props) {
        var _this = _super.call(this, props) || this;
        _this.handleMenuClick = _this.handleMenuClick.bind(_this);
        return _this;
    }
    Navbar.prototype.handleMenuClick = function () {
        this.props.handleMenuClick();
    };
    Navbar.prototype.render = function () {
        return (React.createElement("nav", { className: "navbar navbar-light omni-theme-yellow omni-bottom-border" },
            React.createElement("a", { className: "navbar-brand", href: "#", onClick: this.handleMenuClick },
                React.createElement("i", { "data-feather": "menu" })),
            React.createElement("a", { className: "navbar-brand", href: "#" }, "Omni Notes"),
            React.createElement("a", { className: "navbar-brand", href: "#" },
                React.createElement("i", { "data-feather": "rotate-cw" }))));
    };
    return Navbar;
}(React.Component));
exports.default = Navbar;
//# sourceMappingURL=navbar.js.map