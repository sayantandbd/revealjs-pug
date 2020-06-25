// includes

const pug = require('pug');
const fs = require('fs');
const beautify = require('js-beautify').html;

// declarations
const contentFolder = './pug';
const deckDir = './decks';
const deckFile = 'index.hbs';

// contents
let body;
let content = '';

// read content Folder
fs.readdir(contentFolder, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    i = 0;
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log('Reading ' + file);
        pug_compile(contentFolder + '/' + file);
        i++;
        if (files.length == i) write_deck();
    });
});

// pug compilation
function pug_compile(file) {
    // Compile the source code
    let compiledFunction = pug.compileFile(file);

    // Render a set of data
    body = compiledFunction();
    content = content + '<section>' + body + '</section>';

    console.log('Compiling ' + file);
}

function write_deck() {

    let header = `
---
title: reveal.js - The HTML Presentation Framework
description: A framework for easily creating beautiful presentations using HTML
author: Sayantan Halder
---
    `;

    // writeFile function with filename, content and callback function
    let beautiful_content = beautify(content, {
        "end_with_newline": true,
        "end_with_newline": true
    })

    if (!fs.existsSync(deckDir)){
        fs.mkdirSync(deckDir);
    }

    let compiledFile = deckDir + '/' + deckFile;
    // write the file
    fs.writeFile(compiledFile, header.trim() + '\n' + beautiful_content, function (err) {
        if (err) throw err;
        console.log('Deck generated');
    });
}