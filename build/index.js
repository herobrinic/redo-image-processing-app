"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const imageRoutes_1 = __importDefault(require("./routes/imageRoutes"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Serve static files from the public directory
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
// Serve uploaded images statically
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '..', 'uploads')));
// Parse JSON bodies
app.use(express_1.default.json());
// API routes
app.use('/images', imageRoutes_1.default);
app.use('/api/upload', uploadRoutes_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
