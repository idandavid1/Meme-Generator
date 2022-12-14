'use strict'

let gMeme

function createMeme(imgId, selectedLineIdx = 0){
    gMeme =  { 
            selectedImgId: imgId, 
            selectedLineIdx,
            lines: [createLine({x:200, y:50}, 'hello', 50, 'center', 'red')] 
       }
       
}

function createLine(pos, txt, size, align, color){
    return {
            pos,
            txt, 
            size,
            align, 
            color
    }
}

function getMeme() {
    return gMeme
}

function setLineTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function addLine(pos) {
    const line = createLine(pos, 'hello', 50, 'center', 'red')
    gMeme.lines.push(line)
    gMeme.selectedLineIdx += 1
}

function removeLine() {
    if(!gMeme.lines.length) return
    gMeme.lines.splice( gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = 0
}

function isHaveLines(){
    return gMeme.lines.length > 0 
}


