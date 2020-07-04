// includes

const pug = require('pug');
const fs = require('fs');
const path = require('path');
const beautify = require('js-beautify').html;

// declarations
const contentFolder = './pug';
const deckDir = './decks';
const deckFile = 'index.hbs';

// contents
let body;
let content = '';
let slide_index_content = '';

// read content Folder
fs.readdir(contentFolder, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    let i = 0;
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log('Reading ' + file);
        pug_compile(contentFolder + '/' + file);
        gen_slide_index(i);
        i++;
        if (files.length == i) write_deck();
    });
});

// pug compilation
function pug_compile(file) {
    // Compile the source code
    let compiledFunction = pug.compileFile(file);

    let section_id = path.parse(file).name;

    // Render a set of data
    body = compiledFunction();

    //replace button
    body = body.replace(/<button/gi,"<button onclick='button_click(this)'");

    content = content + '<section id="'+ section_id +'">' + body + '</section>';

    console.log('Compiling ' + file);
}

// left panel slides
function gen_slide_index(i) {

    let slide_no = i + 1;
    slide_index_content = slide_index_content + `
    <div class="slide-box" onclick="gotoslide(`+ i +`);">
        <h1>`+ slide_no +`</h1>
    </div>
    `;

}

function write_deck() {

    // header
    let header = `
---
title: reveal.js - The HTML Presentation Framework
description: A framework for easily creating beautiful presentations using HTML
author: Sayantan Halder
---
    `;

    // left panel
    let left_panel_layout = `
        <div class="left-panel">
            ` + slide_index_content + `
        </div>
    `;

    // slide panel layout
    let slide_panel_layout = `<div class="slide-panel">
        <div class="reveal">
            <div class="slides">
                ` + content + `
            </div>
        </div>
    </div>`;

    // con catinate layout

    let final_content = `
        <div class="flex-container">
        `+ left_panel_layout + slide_panel_layout +`
        </div>
    `;

    // beautify
    // writeFile function with filename, content and callback function
    let beautiful_content = beautify(final_content, {
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