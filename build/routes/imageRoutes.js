"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
// Configure Multer storage
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, '../../uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
// POST /upload route
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: 'No file uploaded.' });
        return;
    }
    res.status(200).json({ filename: req.file.filename });
});
router.get('/gallery', (_req, res) => {
    const uploadsDir = path_1.default.join(__dirname, '../../uploads');
    fs_1.default.readdir(uploadsDir, (err, files) => {
        if (err)
            return res.status(500).json({ error: 'Failed to read gallery' });
        const images = files
            .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file))
            .map((file) => `/uploads/${file}`);
        res.json(images);
    });
});
exports.default = router;
