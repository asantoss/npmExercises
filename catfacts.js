const PDFkit = require('pdfkit');
const catFacts = require('cat-facts');
const fs = require('fs');

const doc = new PDFkit();

doc.pipe(fs.createWriteStream('catFact.pdf'));

let randomFact = catFacts.random()
doc.fontSize(25)
doc.text(`${randomFact.toString()}`, 100, 100)

doc.end();
