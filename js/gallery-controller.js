'use strict'

function onRenderGallery(){
    const imgs = getImgs()
    const strHTMLs = imgs.reduce((acc, img) => {
        acc.push(`<img onclick="initMemePage(${img.id}, 'gallery')" src="${img.url}">`) 
        return acc
    }, [])

    document.querySelector('.gallery .container-imgs').innerHTML = strHTMLs.join('')
}

function onRenderOptionKeyword(elInput) {
    const input = elInput.value
    const keywords = getRightKeyword(input)
    const strHTMLs = keywords.reduce((acc, keyword) => {
        acc.push(`<option value="${keyword}">`)
        return acc
    }, [])

    document.getElementById('keyword').innerHTML = strHTMLs.join('')
    onRenderGallery()
    onRenderCountMap()
}

function onRenderCountMap() {
    const countMap = getCountMap()
    let strHTML = ''
    for(var key in countMap){
        strHTML += `<span onclick="onUpdateMap('${key}')" style="font-size:${countMap[key]}px;">${key}</span>`
    }
    document.querySelector('.popularKeyword').innerHTML = strHTML
    console.log('document.querySelector(.popularKeyword):', document.querySelector('.popularKeyword'))
}

function onUpdateMap(key) {
    document.querySelector('.keyword-text').value = key
    updateFilter(key)
    onRenderGallery()
    updateMap(key)
    onRenderCountMap()
}
