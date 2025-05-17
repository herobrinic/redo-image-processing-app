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
exports.resizeImageHandler = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const fullDir = path_1.default.resolve(__dirname, '../../full');
const thumbDir = path_1.default.resolve(__dirname, '../../thumb');
const resizeImageHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filename = req.query.filename;
        const width = parseInt(req.query.width, 10);
        const height = parseInt(req.query.height, 10);
        if (!filename) {
            res.status(400).send('Filename is required');
            return;
        }
        if (isNaN(width) || isNaN(height)) {
            res.status(400).send('Width and height must be valid numbers');
            return;
        }
        const inputPath = path_1.default.join(fullDir, `${filename}.jpg`);
        const outputPath = path_1.default.join(thumbDir, `${filename}_${width}x${height}.jpg`);
        // Check if input file exists
        if (!fs_1.default.existsSync(inputPath)) {
            res.status(404).send('Image not found');
            return;
        }
        // If already resized image exists, send it
        if (fs_1.default.existsSync(outputPath)) {
            const buffer = yield (0, sharp_1.default)(outputPath).toBuffer();
            const imgSrc = `data:image/jpeg;base64,${buffer.toString('base64')}`;
            res.json({ imgSrc });
            return;
        }
        // Resize and save the image
        yield (0, sharp_1.default)(inputPath)
            .resize(width, height)
            .toFile(outputPath);
        // Send the resized image
        const buffer = yield (0, sharp_1.default)(outputPath).toBuffer();
        const imgSrc = `data:image/jpeg;base64,${buffer.toString('base64')}`;
        res.json({ imgSrc });
    }
    catch (error) {
        console.error('Error in resizeImageHandler:', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.resizeImageHandler = resizeImageHandler;
