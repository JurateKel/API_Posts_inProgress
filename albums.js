const queryParams = document.location.search;
const urlParams = new URLSearchParams(queryParams);
const userId = urlParams.get(`user_id`)

async function getAlbumsByUserId(userIdNum) {
    const albumsRes = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userIdNum}`)
    const albumsData = await albumsRes.json()
    return albumsData
}
async function getUserById(userIdNum) {
    const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${userIdNum}`)
    const userData = await userRes.json()
    return userData
}
async function getAlbums() {
    const albumsRes = await fetch(`https://jsonplaceholder.typicode.com/albums`)
    const albumsData = await albumsRes.json()
    return albumsData
}
async function getAlbumPhotos(albumId) {
    const albumPhotoRes = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
    const albumPhotoData = await albumPhotoRes.json()
    return albumPhotoData
}

if (userId) {
    (async () => {
        const userAlbums = await getAlbumsByUserId(userId);
        const user = await getUserById(userId);

        let number = 1;
        userAlbums.map( async userAlbum => {
            const albumPhotos = await getAlbumPhotos(userAlbum.id);
            let albumWrapper = document.createElement(`div`);
            let albumTitle = document.createElement(`h4`);
            let albumAuthor = document.createElement(`h5`);
            let userPhotosNum = document.createElement(`p`);
            let userPhotosNumLink = document.createElement(`a`);
            let albumPhoto = document.createElement(`img`);
            albumTitle.textContent = userAlbum.title;  
            albumAuthor.textContent = `Album author: ${user.name}`;        
            albumWrapper.append(albumAuthor);
            albumPhoto.src = `https://picsum.photos/200/200?random=${number}`;
            number++;
            userPhotosNumLink.href = `./user.html?user_id=${userAlbum.userId}`;
            userPhotosNumLink.textContent = `Show user profile`;
            userPhotosNum.textContent = `User added ${albumPhotos.length} photos. `;
            
            albumAuthor.after(userPhotosNum, albumPhoto);
            userPhotosNum.append(userPhotosNumLink);
            document.body.append(albumWrapper);
            albumWrapper.append(albumTitle);
        })
    })();
} else {
    (async () => {
        const albums = await getAlbums();
        let number = 1;
        albums.map(async (album) => {
            const user = await getUserById(album.userId);
            const albumPhotos = await getAlbumPhotos(album.id);
            let albumWrapper = document.createElement(`div`);
            let albumTitle = document.createElement(`h4`);
            let albumAuthor = document.createElement(`h5`);
            let userPhotosNum = document.createElement(`p`);
            let userPhotosNumLink = document.createElement(`a`);
            let albumPhoto = document.createElement(`img`);
            albumTitle.textContent = album.title;       
            albumAuthor.textContent = `Album author: ${user.name}`;     
            albumWrapper.append(albumAuthor);
            albumPhoto.src = `https://picsum.photos/200/200?random=${number}`;
            number++;
            userPhotosNumLink.href = `./user.html?user_id=${album.userId}`;
            userPhotosNumLink.textContent = `Show user profile`;
            userPhotosNum.textContent = `User added ${albumPhotos.length} photos. `;
            
            albumAuthor.after(userPhotosNum, albumPhoto);
            userPhotosNum.append(userPhotosNumLink);
            document.body.append(albumWrapper);
            albumWrapper.append(albumTitle);
        });
    })();
};