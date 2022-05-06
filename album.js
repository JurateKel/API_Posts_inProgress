// 6. Sukurti naują puslapį album.html ir jame atvaizduoti:
// 6.1. Albumo pavadinimą.
// 6.2. Album autoriaus vardą. Paspaudus ant vardo - nukreipiama į autoriaus puslapį.
// 6.3. Skiltis, kurioje atvaizduojamos visos albumo nuotraukos. Panaudoti library (biblioteką), kuri skirta gražiam galerijos atvaizdavimui, pvz.:
// 6.3.1. https://photoswipe.com/
// 6.3.2. https://nanogallery2.nanostudio.org/
// 6.3.3. https://sachinchoolur.github.io/lightgallery.js/
// 6.3.4. Arba bet kurią kitą.


let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let albumId = urlParams.get(`album_id`)

let albumWrapper = document.querySelector(`body`);


fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`)
.then(res=>res.json())
.then(album => {
    console.log(album)
    let albumTitle = document.createElement(`h2`)
    albumTitle.textContent = album.title;
    albumWrapper.append(albumTitle)


    fetch(`https://jsonplaceholder.typicode.com/users/${album.userId}`)
    .then(res=>res.json())
    .then(author => {
        let albumAuthorLink = document.createElement(`a`);
        albumAuthorLink.href = `./user.html?user_id=${album.userId}`
        albumAuthorLink.textContent = author.name
        let albumAuthor = document.createElement(`span`)
        albumAuthor.textContent = `Author: `;

        albumWrapper.append(albumAuthorLink);
        albumAuthorLink.before(albumAuthor)
    })

})

