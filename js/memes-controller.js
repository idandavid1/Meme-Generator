'use strict'

function onRenderMemes() {
    const memes = getMemes()
    const strHTMLs = memes.reduce((acc, meme, index) => {
        acc.push(`<img onclick="initMemePage(${index}, 'meme')" src="${meme.memeUrl}">`)
        return acc
    }, [])
    console.log('strHTMLs:', strHTMLs)
    document.querySelector('.memes .container-imgs').innerHTML = strHTMLs.join('')
}