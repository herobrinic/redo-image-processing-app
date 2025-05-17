"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const imageService_1 = require("../services/imageService");
const router = express_1.default.Router();
const uploadsDir = path_1.default.join(__dirname, '../../uploads');
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir);
}
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadsDir),
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({ storage });
// Helper to wrap async route handlers and pass errors to next()
function asyncHandler(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
}
router.post('/', upload.single('image'), asyncHandler((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        res.status(400).json({ error: 'No image file provided' });
        return;
    }
    const width = parseInt(req.body.width);
    const height = parseInt(req.body.height);
    if (isNaN(width) || isNaN(height)) {
        res.status(400).json({ error: 'Invalid width or height' });
        return;
    }
    const resizedImagePath = yield (0, imageService_1.resizeImage)(req.file.path, width, height);
    res.status(200).json({
        resizedImagePath: `/uploads/${path_1.default.basename(resizedImagePath)}`,
    });
})));
exports.default = router;
