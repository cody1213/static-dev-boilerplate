const footnotes = require('./footnotes');

const notes = document.querySelectorAll('.reference');
let errors = [];
if (notes && notes.length) {
  notes.forEach(function(note) {
    const bibtexRef = note.dataset.reference;
    const bibtex = footnotes.find(x => x.citationKey == bibtexRef);
    if (bibtex) {
      let type = bibtex.entryType;
      let { title, author, journal, volume, number, pages, year, publisher, editor, url, booktitle, address } = bibtex.entryTags;
      let content;
      let icon;
      //add periods to middle initials to match our styleguide
      author = author.trim()
      .replace(/\s[A-Z],/gi, '$&--------') // space, single letter, comma
      .replace(/,--------/g, '.,')
      .replace(/\s[A-Z]\s/gi, '$&--------') // space, single letter, space
      .replace(/ --------/g, '. ')
      .replace(/\s[A-Z]$/gi, '$&--------') // space, single letter, EOL
      .replace(/--------/g, '.');

      if (type == "book") {
        content = "";
        if (author) content += author + ', ';
        if (title) content += '<em>' + title + '</em>, ';
        if (publisher) content += publisher + ', ';
        if (year) content += year;
        icon = `<i class='fa fa-book'></i> Book`
      } else if (type == "incollection") {
        content = "";
        if (author) content += author + ', ';
        if (title) content += '<em>' + title + '</em>, ';
        if (booktitle) content += '<em>' + booktitle + '</em> ';
        if (editor) content += "(" + editor + "), "
        if (publisher) content += publisher + ', ';
        if (address) content += address + ', ';
        if (pages) content += "pp: " + pages.replace('--', '-') + ", ";
        if (year) content += year;
        icon = `<i class='fa fa-book-open'></i> In Collection`
      } else if (type == "article") {
        content = "";
        if (author) content += author + ', ';
        if (title) content += '<em>' + title + '</em>, ';
        if (journal) {
          if (journal.includes('Available at SSRN')) {
            content += journal;
          } else {
            content += '<em>' + journal + '</em> ';
          }
        }
        if (volume) content += volume + ' ';
        if (year) year += "(" + year + "), "
        if (number) content += "no. " + number + ', ';
        if (pages) content += "pp: " + pages;
        icon = `<i class='fa fa-file'></i> Article`
      } else {
        content = "";
        if (author) content += author + ', ';
        if (title) content += '<em>' + title.replace(/$\{/, '').replace(/\}^/, '') + '</em>, ';
        if (publisher) content += publisher + ', ';
        if (year) content += year;
        icon = `<i class='fa fa-book'></i> Book`
      }
      if (url) {
        content += "<br /><a href='" + url + "'>" + url + "</a>";
      }
      //replace some aspects of the BibTex data that don't match our style guide
      content = content.replace('"', '\\"').replace('--', '-').replace(/\{/g, '').replace(/\}/g, '').replace(`\\'`, `'`).replace(',,', ',')

      note.innerHTML = `<a href="javascript:void(0)" data-toggle="popover" data-html="true" data-trigger="" data-title="${icon}" data-content="${content}"><sup>&#91;source&#93;</sup></a>`
    } else {
      errors.push(bibtexRef)
      let icon = `<i class='fa fa-question'></i> Missing`
      let content = "Cannot find reference " + bibtexRef
      note.innerHTML = `<a href="javascript:void(0)" data-toggle="popover" data-html="true" data-trigger="" data-title="${icon}" data-content="${content}"><sup><span style='color: red; background: yellow;'>&#91;missing&#93;</span></sup></a>`
    }
  })
}
if (errors && errors.length) console.error(errors)