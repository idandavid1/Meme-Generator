'use strict'

let gIconIndex
let gIsSaveShareDownload
let gEnd
let gElCanvas
let gCtx 
let gIsMove
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function initMemePage(input, fromStr){
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    document.querySelector('.gallery').hidden = true;
    document.querySelector('.memes').hidden = true;
    document.querySelector('.editor').hidden = false;
    if(fromStr === 'gallery') createMeme(input, {x: gElCanvas.width / 2 , y: 50})
    else initMeme(input)
    onRenderMeme()
    gIsMove = false
    gEnd = false
    addListeners()
    gIconIndex = 0
    onRenderIcons()
}

function onRenderMeme() {
    const meme = getMeme()
    const img = findImgById(meme.selectedImgId)
    const elImg = new Image()
    elImg.src = img.url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        renderLines()
        if(!gEnd) renderTextBox()
        else onLoadMeme()
    }
}

function renderLines(){
    const meme = getMeme()
    meme.lines.forEach(line => {
        gCtx.fillStyle = line.color
        gCtx.font = `${line.size}px ${line.font}` 
        gCtx.textAlign = line.align
        const {x, y} = line.pos
        gCtx.fillText(line.txt, x, y)
    });
}

function onSetText(el) {
    if(!isHaveLines()) return
    setLineTxt(`${el.value}`)
    onRenderMeme()
}

function onChangeAlign(align) {
    if(!isHaveLines()) return
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].align = align
    onRenderMeme()
}

function onAddLine() {
    const meme = getMeme()
    let numberOfLine
    if(meme.lines === []) numberOfLine = 0
    else numberOfLine = meme.lines.length
    if(numberOfLine > 4) return
    let y
    const x = gElCanvas.width / 2
    switch (numberOfLine) {
        case 0:
            y = 50
            break;
        case 1:
            y = gElCanvas.height - 50
            break;
        case 2:
            y = gElCanvas.height / 2
            break;
        case 3:
            y = gElCanvas.height / 2 + 50
            break;
        case 4:
        y = gElCanvas.height / 2 - 50
        break;
    }
    addLine({x, y})
    document.querySelector('.text').value = ''
    onRenderMeme()
}

function onChangeFontSize(change) {
    if(!isHaveLines()) return
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].size += change
    onRenderMeme()
}

function onSetColorText(color) {
    if(!isHaveLines()) return
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].color = color.value
    onRenderMeme()
}

function onRemoveLine() {
    removeLine()
    onRenderMeme()
    document.querySelector('.text').value = ''
}

function onSwitchLine() {
    const meme = getMeme()
    if(meme.selectedLineIdx >= meme.lines.length - 1) meme.selectedLineIdx = 0
    else meme.selectedLineIdx += 1
    document.querySelector('.text').value = ''
    onRenderMeme()
    renderTextBox()
}

function renderTextBox() {
    if(!isHaveLines()) return
    const meme = getMeme()
    const pos = meme.lines[meme.selectedLineIdx].pos
    const size = meme.lines[meme.selectedLineIdx].size
    const x = 20
    const width = gElCanvas.width - 40
    const y = pos.y - size + 5
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(x, y, width, size)
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown() {
    gIsMove = true
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    if(!gIsMove) return 
    const pos = getEvPos(ev)
    if (!isTextBoxClicked(pos)) return
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].pos = pos
    onRenderMeme()
}

function onUp() {
    document.body.style.cursor = 'grab'
    gIsMove = false
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }

    return pos
}

function isTextBoxClicked(posClick) {
    const meme = getMeme()
    const pos = meme.lines[meme.selectedLineIdx].pos
    const size = meme.lines[meme.selectedLineIdx].size
    const width = gElCanvas.width - 40
    const y = pos.y - size + 5
    if(posClick.x > 20 && posClick.x < width && 
       posClick.y > y && posClick.y < y + size) return true

       return false
}

function onSaveShareDownloadMeme(str) {
    gIsSaveShareDownload = str
    gEnd = true
    onRenderMeme()
}

function onLoadMeme(){
    if(gIsSaveShareDownload === 'save'){
        const meme = getMeme()
        meme.memeUrl =  gElCanvas.toDataURL('image/png')
        saveMeme(meme)
        onMoveToMemes()
    }
    else if(gIsSaveShareDownload === 'download'){
        const img =  gElCanvas.toDataURL('image/jpeg')
        var link = document.createElement('a')
        link.download = "my-image.png"
        link.href = img
        link.click()
    }
    else {
        const imgDataUrl = gElCanvas.toDataURL('image/jpeg')
        function onSuccess(uploadedImgUrl) {
            const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
        }
        doUploadImg(imgDataUrl, onSuccess)
        }
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)
    fetch('//ca-upload.com/here/upload.php', { method: 'POST', body: formData })
        .then(res => res.text())
        .then(url => {
            onSuccess(url)
        })
}


function onChangeFont(elFont) {
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].font = elFont.value
    onRenderMeme()
}

function onRenderIcons() {
    let strHTML = `<img onclick="changeIcon(${-1})" style="width: 30px;" src="icons/left.png">`
    for(let i = gIconIndex; i < gIconIndex + 3; i++) {
        strHTML += `<img src="icons/${i + 1}.png">`
    }
    strHTML += `<img onclick="changeIcon(${1})" style="width: 30px; "src="icons/right.png">`
    document.querySelector('.icon-container').innerHTML = strHTML
} 

function changeIcon(change) {
    if(gIconIndex === 0 && change === -1) return
    if(gIconIndex === 3 && change === 1) return
    gIconIndex += change
    onRenderIcons()
}
