const PDFDocument = require('pdfkit');
const fs = require('fs');

function convertImageToPDF(imagePath, outputPath) {
  const doc = new PDFDocument();
  const imageBuffer = fs.readFileSync(imagePath);

  // Create a write stream to save the PDF
  const writeStream = fs.createWriteStream(outputPath);

  // Pipe the image into the PDF document
  doc.pipe(writeStream);
  doc.image(imageBuffer, 0, 0); // Add the image to the PDF at position (0, 0)
  doc.end();

  writeStream.on('finish', () => {
    console.log(`Image converted to PDF: ${outputPath}`);
  });
}

// Replace 'input_image.jpg' and 'output_image.pdf' with the actual filenames
convertImageToPDF('screenshot.png', 'invoice.pdf');
