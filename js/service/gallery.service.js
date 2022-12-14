'use strict'

let gImgs = createGallery()

function createGallery() {
    return [
        {id: 1, url: 'img/1.jpg', keywords: ['trump', 'politics']},
        {id: 2, url: 'img/2.jpg', keywords: ['dog', 'animal']},
        {id: 3, url: 'img/3.jpg', keywords: ['dog', 'baby', 'cute']},
        {id: 4, url: 'img/4.jpg', keywords: ['cute', 'cat', 'computer']},
        {id: 5, url: 'img/5.jpg', keywords: ['success', 'baby']},
        {id: 6, url: 'img/6.jpg', keywords: ['history', 'wired']},
        {id: 7, url: 'img/7.jpg', keywords: ['baby', 'cute', 'surprised']},
        {id: 8, url: 'img/8.jpg', keywords: ['funny', 'cat']},
        {id: 9, url: 'img/9.jpg', keywords: ['funny', 'magics']},
        {id: 10, url: 'img/10.jpg', keywords: ['baby', 'cute', 'evil']},
        {id: 11, url: 'img/11.jpg', keywords: ['funny', 'Obama', 'president']},
        {id: 12, url: 'img/12.jpg', keywords: ['man', 'kiss']},
        {id: 13, url: 'img/13.jpg', keywords: ['Haim', 'point']},
        {id: 14, url: 'img/14.jpg', keywords: ['Leonardo', 'smile', 'cheers']},
        {id: 15, url: 'img/15.jpg', keywords: ['men', 'smile']},
        {id: 16, url: 'img/16.jpg', keywords: ['men', 'smile']},
        {id: 17, url: 'img/17.jpg', keywords: ['Putin', 'president', 'point']},
        {id: 18, url: 'img/18.jpg', keywords: ['toy-store', 'movie']}
    ]
}

function getImgs(){
    return gImgs
}

function findImgById(imgId) {
    return gImgs.find(img => img.id === imgId)
}