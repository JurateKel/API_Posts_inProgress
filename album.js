let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let albumId = urlParams.get(`album_id`);
let randomNum = Math.floor(Math.random()*100)
let albumWrapper = document.querySelector(`body`);
let imgWrapper = document.querySelector(`#gallery`);

async function getAlbumsById(albumIdNum) {
    const albumRes = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumIdNum}`)
    const albumData = await albumRes.json()
    return albumData
};
async function getUserById(albumUserId) {
    const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${albumUserId}`)
    const userData = await userRes.json()
    return userData
};
async function getAlbumPhotoById(albumIdNum) {
    const photoRes = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumIdNum}/photos`)
    const photoData = await photoRes.json()
    return photoData
};
async function renderAlbum() {
    const album = await getAlbumsById(albumId);
    const user = await getUserById(album.userId);
    const albumPhotos = await getAlbumPhotoById(albumId);

    let albumTitle = document.createElement(`h2`);
    let albumAuthorLink = document.createElement(`a`);
    let albumAuthor = document.createElement(`span`);
    albumTitle.textContent = album.title;
    // albumTitle.style.paddingLeft = `2.5%`;
    albumAuthorLink.href = `./user.html?user_id=${album.userId}`;
    albumAuthorLink.textContent = user.name;
    albumAuthor.textContent = `Author: `;
    // albumAuthor.style.padding = `2.5%`;

    albumWrapper.prepend(albumTitle);
    imgWrapper.before(albumAuthorLink);
    albumAuthorLink.before(albumAuthor);

    albumPhotos.map(image => {
        let imgLink = document.createElement(`a`);
        let imgImg = document.createElement(`img`);
        imgLink.href = image.url;
        imgLink.target = `_blank`;
        imgLink.dataset.pswpHeight = `600px`;  
        imgLink.dataset.pswpWidth = `600px`;
        imgImg.src = image.thumbnailUrl;
        imgImg.style.width = `20%`; 
        imgImg.style.height = `20%`;
        imgImg.style.padding = `2.5%`;

        albumWrapper.append(imgWrapper);
        imgWrapper.append(imgLink);
        imgLink.append(imgImg);
    });
};
renderAlbum();