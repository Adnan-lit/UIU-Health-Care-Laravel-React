const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, '../node_modules/pdfjs-dist/build/pdf.worker.min.js');
const targetFile = path.join(__dirname, '../public/pdf.worker.min.js');

fs.copyFile(sourceFile, targetFile, (err) => {
    if (err) {
        console.error('Error copying PDF worker file:', err);
        process.exit(1);
    }
    console.log('PDF worker file copied successfully');
}); 