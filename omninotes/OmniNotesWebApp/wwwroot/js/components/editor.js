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
var Editor = /** @class */ (function (_super) {
    __extends(Editor, _super);
    function Editor(props) {
        return _super.call(this, props) || this;
    }
    Editor.prototype.render = function () {
        return (React.createElement("div", { className: "omni-page" },
            React.createElement("div", { className: "clearfix" },
                React.createElement("div", { className: "float-left" },
                    React.createElement("input", { type: "text", value: "Page Title" })),
                React.createElement("div", { className: "float-right" }, "22/02/2018")),
            React.createElement("hr", null),
            React.createElement("textarea", null)));
    };
    return Editor;
}(React.Component));
exports.default = Editor;
//# sourceMappingURL=editor.js.map