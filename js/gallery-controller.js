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

function onRenderCountMap(isRenderAll = true) {
    let counter = 1
    const countMap = getCountMap()
    let strHTML = ''
    for(let key in countMap){
        strHTML += `<span onclick="onUpdateMap('${key}')" style="font-size:${countMap[key]}px;">${key}</span>`
        if(!isRenderAll && counter === 5) break
        counter++
    }
    if(!isRenderAll) strHTML += `<span onclick="onRenderCountMapAllToggle(${true})">more...</span>`
    else strHTML += `<span onclick="onRenderCountMapAllToggle(${false})">close</span>`
    document.querySelector('.popularKeyword').innerHTML = strHTML
}

function onUpdateMap(key) {
    document.querySelector('.keyword-text').value = key
    updateFilter(key)
    onRenderGallery()
    updateMap(key)
    onRenderCountMap()
}

function onRenderCountMapAllToggle(isRenderAll){
    onRenderCountMap(isRenderAll)
}
