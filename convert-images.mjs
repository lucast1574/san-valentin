import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = 'c:/VSCODE/Work/rankedai/valentine-elizabeth/public';
const files = fs.readdirSync(publicDir);

files.forEach(async (file) => {
    if (file.toLowerCase().endsWith('.heic')) {
        const filePath = path.join(publicDir, file);
        const outputName = file.replace(/\.[^/.]+$/, "") + ".jpg";
        const outputPath = path.join(publicDir, outputName);

        try {
            console.log(`Converting ${file} to ${outputName}...`);
            await sharp(filePath, { failOn: 'none' })
                .toFormat('jpeg')
                .toFile(outputPath);
            console.log(`Success!`);
        } catch (err) {
            console.error(`Error converting ${file}:`, err);
        }
    }
});
