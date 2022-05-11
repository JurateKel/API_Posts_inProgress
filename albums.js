
// 9.1. Prie kiekvieno albumo turi būti:
// 9.1.1. Parašytas jo pavadinimas.
// 9.1.2. Parašytas vartotojo, sukūrusio šį albumą, vardas.
// 9.1.3. Albume esančių nuotraukų skaičius.
// 9.1.4. Viena nuotrauka

let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let userId = urlParams.get(`user_id`)

if (userId) {

fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
.then(res=>res.json())
.then(userAlbums => {
    userAlbums.map(userAlbum => {
        let albumWrapper = document.createElement(`div`)
        let albumTitle = document.createElement(`h4`)
        albumTitle.textContent = userAlbum.title            
        let albumAuthor = document.createElement(`h5`)
        
        document.body.append(albumWrapper)
        albumWrapper.append(albumTitle)

        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(res=>res.json())
        .then(user => {
            albumAuthor.textContent = `Album author: ${user.name}`;        
            albumWrapper.append(albumAuthor)

            fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${userAlbum.id}`)
            .then(res=>res.json())
            .then(photos => {
                let userPhotosNum = document.createElement(`p`)
                let userPhotosNumLink = document.createElement(`a`)
                let albumPhoto = document.createElement(`img`)
                albumPhoto.src = `${photos[0].thumbnailUrl}`
                userPhotosNumLink.href = `./user.html?user_id=${userAlbums.id}`
                userPhotosNumLink.textContent = `Show all`
                userPhotosNum.textContent = `User added ${photos.length} photos. `
                
                albumAuthor.after(userPhotosNum, albumPhoto)
                userPhotosNum.append(userPhotosNumLink)
            })
        })
    })
})
} else {
    fetch(`https://jsonplaceholder.typicode.com/albums`)
    .then(res=>res.json())
    .then(userAlbums => {
        userAlbums.map(userAlbum => {
            let albumWrapper = document.createElement(`div`)
            let albumTitle = document.createElement(`h4`)
            albumTitle.textContent = userAlbum.title            
            let albumAuthor = document.createElement(`h5`)
            
            document.body.append(albumWrapper)
            albumWrapper.append(albumTitle)
    
            fetch(`https://jsonplaceholder.typicode.com/users/${userAlbum.userId}`)
            .then(res=>res.json())
            .then(user => {
                albumAuthor.textContent = `Album author: ${user.name}`;        
                albumWrapper.append(albumAuthor)

                fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${userAlbum.id}`)
                .then(res=>res.json())
                .then(photos => {
                    let userPhotosNum = document.createElement(`p`)
                    let userPhotosNumLink = document.createElement(`a`)
                    let albumPhoto = document.createElement(`img`)
                    albumPhoto.src = `${photos[0].thumbnailUrl}`
                    userPhotosNumLink.href = `./user.html?user_id=${userAlbums.id}`
                    userPhotosNumLink.textContent = `Show all`
                    userPhotosNum.textContent = `User added ${photos.length} photos. `
                    
                    albumAuthor.after(userPhotosNum, albumPhoto)
                    userPhotosNum.append(userPhotosNumLink)
                })
            })
        })
    })
}