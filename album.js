

let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let albumId = urlParams.get(`album_id`)
let randomNum = Math.floor(Math.random()*100)
let albumWrapper = document.querySelector(`body`);
let imgWrapper = document.querySelector(`#gallery`)

fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`)
.then(res=>res.json())
.then(album => {
    console.log(album)
    let albumTitle = document.createElement(`h2`)
    albumTitle.textContent = album.title;
    albumTitle.style.paddingLeft = `2.5%`
    albumWrapper.prepend(albumTitle)
    let albumAuthorLink = document.createElement(`a`);
    
    
    fetch(`https://jsonplaceholder.typicode.com/users/${album.userId}`)
    .then(res=>res.json())
    .then(author => {
        albumAuthorLink.href = `./user.html?user_id=${album.userId}`
        albumAuthorLink.textContent = author.name
        let albumAuthor = document.createElement(`span`)
        albumAuthor.textContent = `Author: `;
        albumAuthor.style.padding = `2.5%`
        imgWrapper.before(albumAuthorLink);
        albumAuthorLink.before(albumAuthor)
    })

    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
    .then(res=>res.json())
    .then(images => {
        images.map(image => {
            console.log(image)


            let imgLink = document.createElement(`a`)
            imgLink.href = image.url
            imgLink.target = `_blank`;
            imgLink.dataset.pswpHeight = `600px`     
            imgLink.dataset.pswpWidth = `600px`     
            let imgImg = document.createElement(`img`)
            imgImg.src = image.thumbnailUrl
            imgImg.style.width = `20%`     
            imgImg.style.height = `20%`   
            imgImg.style.padding = `2.5%`   

            albumWrapper.append(imgWrapper)
            imgWrapper.append(imgLink)
            imgLink.append(imgImg)
        })
    })
})

