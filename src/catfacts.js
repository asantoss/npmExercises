const PDFkit = require('pdfkit');
const catFacts = require('cat-facts');
const lodash = require('lodash');
const kittyAPIKey = 'f8121cfd-3880-4896-abce-ab2bcfd73068';
const axios = require('axios');
const fs = require('fs');
const doc = new PDFkit();
var random = lodash.random(0, 255)

const catFact = function (factsWanted, random) {
    let stream = fs.WriteStream;
    let randomFact = catFacts.random()
    let catPDFUrl = `catFacts${random}.pdf`
    return new Promise(function (resolve, reject) {
        doc.pipe(fs.createWriteStream('./media/pdfs/' + catPDFUrl));
        doc.fontSize(25)
        if (factsWanted) {
            doc.font('Times-Bold')
                .text(`These are just ${factsWanted} facts about Kitties!`), {
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
            return resolve(catPDFUrl)
        } else {
            return reject(console.error)
        }
    });
}

module.exports = {
    'makePdf': catFact,
    'random': random
}
