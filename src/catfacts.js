const PDFkit = require('pdfkit');
const catFacts = require('cat-facts');
const lodash = require('lodash')
const fs = require('fs');
const doc = new PDFkit();
var random = lodash.random(0, 255)

const catFact = function (factsWanted, random) {
    let stream = fs.WriteStream;
    let randomFact = catFacts.random()
    let catPDFUrl = `./media/pdfs/catFacts${random}.pdf`
    return new Promise(kitty => {
        doc.pipe(fs.createWriteStream(catPDFUrl));
        // console.log(stream.bytesWritten);
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
                .list(facts), {
                    bulletRadius: '5px',
                    textIndent: '10px'
                }
        }
        doc.end();
        if (stream.Readable) {
            console.log('All ready!')
            return kitty
        }
    }, reject => {
        if (console.error) {
            reject
        }
    })
}

module.exports = {
    'makePdf': catFact,
    'random': random
}
