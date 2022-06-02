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

async function renderAlbum() {
    const album = await getAlbumsById(albumId);
    const user = await getUserById(album.userId);

    let albumTitle = document.createElement(`h2`);
    let albumAuthorLink = document.createElement(`a`);
    let albumAuthor = document.createElement(`span`);
    albumTitle.textContent = album.title;
    albumAuthorLink.href = `./user.html?user_id=${album.userId}`;
    albumAuthorLink.textContent = user.name;
    albumAuthor.textContent = `Author: `;

    albumWrapper.prepend(albumTitle);
    imgWrapper.before(albumAuthorLink);
    albumAuthorLink.before(albumAuthor);

    for (let i=1; i<50; i++) {
        let imgLink = document.createElement(`a`);
        let imgImg = document.createElement(`img`);
        imgLink.href = `https://picsum.photos/600/600?random=${i}`;
        imgLink.target = `_blank`;
        imgLink.dataset.pswpHeight = `600px`;  
        imgLink.dataset.pswpWidth = `600px`;
        imgImg.src = `https://picsum.photos/200/200?random=${i}`;
        imgImg.style.width = `20%`; 
        imgImg.style.height = `20%`;
        imgImg.style.padding = `2.5%`;

        albumWrapper.append(imgWrapper);
        imgWrapper.append(imgLink);
        imgLink.append(imgImg);
    }
};
renderAlbum();