const PDFkit = require('pdfkit');
const catFacts = require('cat-facts');
const lodash = require('lodash');
const downloadPic = require('./wallpaper').downloadPic
const kittyAPIKey = 'f8121cfd-3880-4896-abce-ab2bcfd73068';
const axios = require('axios');

const fs = require('fs');
const doc = new PDFkit();
var random = lodash.random(0, 255)

const catFact = function(factsWanted, random, url) {
    let stream = fs.WriteStream;
    let randomFact = catFacts.random()
    let catPDFUrl = `catFacts${random}.pdf`
    doc.pipe(fs.createWriteStream(`${process.cwd()}/media/pdfs/${catPDFUrl}`));
    return new Promise(function(resolve, reject) {
        try {
            doc.image(`${url}`, 150, 15, { fit: [500, 250] }).moveDown(15)
        } catch {
            console.log("I pulled a bad image, Sorry it won't happen on your next pdf")
        }
        if (factsWanted) {
            doc.font('Times-Bold')
                .fontSize(25)
                .text(`These are ${factsWanted} facts about kitties!`), 100, 80, {
                    width: 410,
                    align: 'center',
                    underline: true,
                }
            let facts = []
            for (let i = 0; i < factsWanted; i++) {
                facts.push(catFacts.random().toString())
            }
            doc.fontSize(18)
                .font('Times-Roman')
                .list(facts), {
                    bulletRadius: '5px',
                    textIndent: '10px'
                }
        } else {
            doc.font('Times-Bold')
                .text(`Here's a fact about Kitties`), {
                    width: 410,
                    align: 'center',
                    underline: true,
                }
            let facts = []
            facts.push(catFacts.random().toString())
            doc.fontSize(18)
                .font('Times-Roman')
                .list(facts), {
                    bulletRadius: '5px',
                    textIndent: '10px'
                }
            console.log('If you add a number as the 3rd argument I can give you more facts!')
        }
        doc.end();
        if (stream.Readable) {
            try {
                return resolve(catPDFUrl)
            } catch {
                return reject(console.log("For some reason I couldn't make this one please run it again!"))
            }
        }
    });
}

module.exports = {
    'makePdf': catFact,
    'random': random
}