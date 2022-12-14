'use strict'

let gElCanvas
let gCtx 

function initMemePage(){
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
}

function onRenderMeme(imgId) {
    document.querySelector('.gallery').hidden = true;
    document.querySelector('.editor').hidden = false;
    const img = findImgById(imgId)
    const elImg = new Image()
    elImg.src = img.url
    console.log('elImg', elImg)
    elImg.onload = () => {
        console.log('elImg:', elImg)
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function renderImgOnCanvas(img) {
    console.log('img:', img)
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}