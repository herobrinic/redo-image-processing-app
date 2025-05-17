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
exports.resizeAndSaveImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const resizeAndSaveImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded' });
        }
        const width = parseInt(req.body.width, 10);
        const height = parseInt(req.body.height, 10);
        if (isNaN(width) || isNaN(height)) {
            return res.status(400).json({ error: 'Invalid width or height' });
        }
        const publicUploadDir = path_1.default.join(__dirname, '../../public/uploads');
        if (!fs_1.default.existsSync(publicUploadDir)) {
            fs_1.default.mkdirSync(publicUploadDir, { recursive: true });
        }
        const outputFilename = `resized-${Date.now()}-${req.file.originalname}`;
        const outputPath = path_1.default.join(publicUploadDir, outputFilename);
        yield (0, sharp_1.default)(req.file.path)
            .resize(width, height)
            .toFile(outputPath);
        return res.status(200).json({ url: `/uploads/${outputFilename}` });
    }
    catch (error) {
        console.error('Error processing image:', error);
        return res.status(500).json({ error: 'Image processing failed' });
    }
});
exports.resizeAndSaveImage = resizeAndSaveImage;
