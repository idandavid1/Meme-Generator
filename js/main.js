'use strict'

function OnInit(){
    onRenderGallery()
    onRenderCountMap()
}

function onMoveToGallery(){
    document.querySelector('.editor').hidden = true;
    document.querySelector('.memes').hidden = true;
    document.querySelector('.gallery').hidden = false;
    document.querySelector('.gallery-li').classList.add('curr-page')
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

function toggleMenu(elButton) {
    const elHeader = document.querySelector('header')
    if(elButton.innerText === 'X') {
        elHeader.querySelector('nav').style.display = 'none'
        elButton.innerText = '☰'
        elHeader.style.height = '10vh'
    } else {
        elHeader.querySelector('nav').style.display = 'block'
        elButton.innerText = 'X'
        elHeader.style.height = '40vh'
    }
}

