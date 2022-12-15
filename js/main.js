'use strict'

function OnInit(){
    renderGallery()
    renderCountMap()
}

function onMoveToGallery(el){
    document.querySelector('.editor').hidden = true;
    document.querySelector('.memes').hidden = true;
    document.querySelector('.gallery').hidden = false;
    el.classList.add('curr-page')
    document.querySelector('.memes-li').classList.remove('curr-page')
}

function onMoveToMemes(){
    document.querySelector('.editor').hidden = true;
    document.querySelector('.memes').hidden = false;
    document.querySelector('.gallery').hidden = true;
    document.querySelector('.memes-li').classList.add('curr-page')
    document.querySelector('.gallery-li').classList.remove('curr-page')
    onRenderMemes()
}

