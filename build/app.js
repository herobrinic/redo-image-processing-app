"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const imageRoutes_1 = __importDefault(require("./routes/imageRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// for galley
app.use('/api/images', imageRoutes_1.default);
// Serve uploads folder publicly
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// Mount API routes with `/api` prefix
app.use('/api/upload', uploadRoutes_1.default);
// Serve your frontend (adjust path if needed)
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Catch-all for frontend routes (optional) STOPED thow Error
// app.get('*', (_req, res) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// });
exports.default = app;
