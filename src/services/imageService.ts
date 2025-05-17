import sharp from 'sharp';
import path from 'path';

export const resizeImage = async (
  inputPath: string,
  width: number,
  height: number
): Promise<string> => {
  const outputFilename = `resized-${Date.now()}${path.extname(inputPath)}`;
  const outputPath = path.join(path.dirname(inputPath), outputFilename);

  await sharp(inputPath)
    .resize(width, height)
    .toFile(outputPath);

  return outputPath;
};
