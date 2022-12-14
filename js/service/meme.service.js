'use strict'

const MEMES_KEY = 'memes'
let gMeme
let gMemes = createMemes()

function createMemes(){
    let memes = loadFromStorage(MEMES_KEY)
    if(!memes) memes = []
    return memes
}

function createMeme(imgId, pos, selectedLineIdx = 0, memeUrl = ''){
    gMeme =  { 
            selectedImgId: imgId, 
            selectedLineIdx,
            lines: [createLine(pos, 'hello', 50, 'center', 'black', 'Impact')],
            memeUrl,
            icons: []
       }
       
}

function createLine(pos, txt, size, align, color, font){
    return {
            pos,
            txt, 
            size,
            align, 
            color, 
            font
    }
}

function getMeme() {
    return gMeme
}

function setLineTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function addLine(pos) {
    const line = createLine(pos, 'hello', 50, 'center', 'black', 'Impact')
    gMeme.lines.push(line)
    if(gMeme.lines.length === 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx += 1
}

function removeLine() {
    if(!gMeme.lines.length) return
    gMeme.lines.splice( gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = 0
}

function isHaveLines(){
    return gMeme.lines.length > 0 
}

function saveMeme(meme) {
    if(!gMemes.includes(meme)) gMemes.push(meme)
    saveToStorage(MEMES_KEY, gMemes)
}

function getMemes() {
    return gMemes
}

function initMeme(index) {
    gMeme = gMemes[index]
}

function createIcon(pos, img, url){
    gMeme.icons.push({pos, img, url})
}

function isLastIcon(iconNumber){
    return gMeme.icons.length === iconNumber
}




