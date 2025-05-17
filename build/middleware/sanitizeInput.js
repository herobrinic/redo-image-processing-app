"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeQueryParams = sanitizeQueryParams;
const sanitize_html_1 = __importDefault(require("sanitize-html"));
function sanitizeQueryParams(req, res, next) {
    for (const key in req.query) {
        const value = req.query[key];
        if (typeof value === 'string') {
            req.query[key] = (0, sanitize_html_1.default)(value, {
                allowedTags: [],
                allowedAttributes: {},
            });
        }
    }
    next();
}
