'use strict'

let gIconIndex
let gStartPos
let gElCanvas
let gCtx 
let gIsMove
let gImg
let gIsRenderBox
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function initMemePage(input, fromStr){
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    gImg = ''
    onMoveToMeme()
    onFitCanvasHightToImg(input, fromStr)
    if(fromStr === 'gallery'){
        createMeme(input, {x: gElCanvas.width / 2 , y: 50})
        onRenderMeme()
    } else {
        initMeme(input)
        prepareIconMeme()
    }
    gIsMove = false
    gIsRenderBox = true
    addListeners()
    gIconIndex = 0
    onRenderIconsDiv()
}

function onRenderMeme() {
    const meme = getMeme()
    if(!gImg) {
        const img = findImgById(meme.selectedImgId)
        const elImg = new Image()
        elImg.src = img.url
        elImg.onload = () => {
            gCtx.drawImage(gImg, 0, 0, gElCanvas.width, gElCanvas.height)
            renderLines()
            onRenderIcons()
            renderTextBox()
        }
        gImg = elImg
    } else {
            gCtx.drawImage(gImg, 0, 0, gElCanvas.width, gElCanvas.height)
            renderLines()
            onRenderIcons()
            if(gIsRenderBox) renderTextBox()
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
    const x = 10
    const width = gElCanvas.width - 20
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

function onDown(ev) {
    gIsMove = true
    document.body.style.cursor = 'grabbing'
    const pos = getEvPos(ev)
    gStartPos = pos
    onChooseLine(pos)
}

function onMove(ev) {
    if(!gIsMove) return 
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    const icon = isIconClick(pos)
    if(icon) {
        icon.pos.x += dx
        icon.pos.y += dy
    } else if (isTextBoxClicked(pos)) {
        const meme = getMeme()
        meme.lines[meme.selectedLineIdx].pos.x += dx
        meme.lines[meme.selectedLineIdx].pos.y += dy
    }
    onRenderMeme()
    gStartPos = pos
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
    const width = gElCanvas.width - 20
    const y = pos.y - size + 5
    if(posClick.x > 10 && posClick.x < width && 
       posClick.y > y && posClick.y < y + size) return true

       return false
}

function isIconClick(posClick) {
    const meme = getMeme()
    const icons = meme.icons
    return icons.find(icon => {
        const pos = icon.pos
        return pos.x < posClick.x && (pos.x + 60) > posClick.x &&
               pos.y < posClick.y && (pos.y + 60) > posClick.y
    })      
}

function onSave() {
    gIsRenderBox = false
    onRenderMeme()
    const meme = getMeme()
    meme.memeUrl =  gElCanvas.toDataURL('image/jpeg')
    saveMeme(meme)
    onMoveToMemes()
}

function onDownload() {
    gIsRenderBox = false
    onRenderMeme()
    const img =  gElCanvas.toDataURL('image/jpeg')
    var link = document.createElement('a')
    link.download = "my-image.png"
    link.href = img
    link.click()
    onMoveToGallery()
}

function onShare() {
    gIsRenderBox = false
    onRenderMeme()
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    doUploadImg(imgDataUrl, onSuccess)
    onMoveToGallery()
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

function onRenderIconsDiv() {
    let strHTML = `<img onclick="changeIconDiv(${-1})" style="width: 30px;" src="icons/left.png">`
    for(let i = gIconIndex; i < gIconIndex + 3; i++) {
        strHTML += `<img onclick="onCreateIcon('icons/${i + 1}.png')" src="icons/${i + 1}.png">`
    }
    strHTML += `<img onclick="changeIconDiv(${1})" style="width: 30px; "src="icons/right.png">`
    document.querySelector('.icon-container').innerHTML = strHTML
} 

function changeIconDiv(change) {
    if(gIconIndex === 0 && change === -1) return
    if(gIconIndex === 3 && change === 1) return
    gIconIndex += change
    onRenderIconsDiv()
}

function onCreateIcon(url) {
    const pos = {x: gElCanvas.width / 2 - 30, y: gElCanvas.height / 2 - 30}
    const img = new Image
    img.src = url
    img.onload = () => {
        createIcon(pos, img, url)
        onRenderIcon(pos, img)
    }
    
}

function onRenderIcon(pos, img) {
    gCtx.drawImage(img, pos.x, pos.y, 60, 60)
} 

function onRenderIcons(){
    const meme = getMeme()
    const icons = meme.icons
    icons.forEach(icon => {
        onRenderIcon(icon.pos, icon.img)
    })
}

function onFitCanvasHightToImg(input, fromStr) {
    let url
    if(fromStr === 'gallery') {
        const img = getImgById(input)
        url = img.url
    } else {
        initMeme(input)
        const meme = getMeme()
        url = meme.memeUrl
    } 
    const elImg = new Image()
    elImg.src = url
    elImg.onload = () => {
        const height = (elImg.height * gElCanvas.width) / elImg.width
        gElCanvas.height = height
    }
}

function onChooseLine(posClick) {
    const meme = getMeme()
    meme.lines.forEach((line, idx) => {
        const pos = line.pos
        const size = line.size
        const width = gElCanvas.width - 20
        const y = pos.y - size + 5
        if(posClick.x > 10 && posClick.x < width && 
        posClick.y > y && posClick.y < y + size) {
            meme.selectedLineIdx = idx
            return onRenderMeme()
        }
    })
}

function prepareIconMeme() {
    let countIcon = 0
    if(isLastIcon(countIcon)) onRenderMeme()
    const meme = getMeme()
    meme.icons.forEach(icon => {
        const elImg = new Image
        elImg.src = icon.url
        elImg.onload = () => {
            countIcon++
            icon.img = elImg
            if(isLastIcon(countIcon)) onRenderMeme()
        }
    })
}


