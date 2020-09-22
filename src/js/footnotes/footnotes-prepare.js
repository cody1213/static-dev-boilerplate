const fs = require('fs');
const bibtexParse = require('bibtex-parse-js');
const file = './usaleep.bib'
const bibtex = fs.readFileSync(file, 'utf8')
const references = bibtexParse.toJSON(bibtex);

console.log("module.exports = ", JSON.stringify(references, null, 2))