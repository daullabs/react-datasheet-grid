"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = void 0;
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const Cell = ({ children, gutter, stickyRight, stickyLeft, active, disabled, className, width, left, gutterWidth, }) => {
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)('dsg-cell', gutter && 'dsg-cell-gutter', disabled && 'dsg-cell-disabled', gutter && active && 'dsg-cell-gutter-active', stickyRight && 'dsg-cell-sticky-right', stickyLeft && 'dsg-cell-sticky-left', className), style: {
            width,
            left: stickyRight ? undefined : stickyLeft && gutterWidth !== undefined ? gutterWidth : left,
        } }, children));
};
exports.Cell = Cell;
//# sourceMappingURL=Cell.js.map