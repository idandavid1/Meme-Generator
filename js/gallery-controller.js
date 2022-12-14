'use strict'

function renderGallery(){
    const imgs = getImgs()
    const strHTMLs = imgs.reduce((acc, img) => {
        acc.push(`<img onclick="initMemePage(${img.id})" src="${img.url}">`) 
        return acc
    }, [])
    document.querySelector('.container-imgs').innerHTML = strHTMLs.join('')
}