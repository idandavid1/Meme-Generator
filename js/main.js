'use strict'

function OnInit(){
    renderGallery()
}

function renderGallery(){
    const imgs = getImgs()
    const strHTMLs = imgs.reduce((acc, img) => {
        acc.push(`<img onclick="onRenderMeme('${img.id}')" src="${img.url}">`) 
        return acc
    }, [])
console.log('strHTMLs:', strHTMLs)
    document.querySelector('.container-imgs').innerHTML = strHTMLs.join('')
}

function onRenderMeme(imgId) {
    document.querySelector('.gallery').hidden = true;
    document.getElementById('.editor').hidden = false;
    const img = findImgById(imgId)
}