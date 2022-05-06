// 3. Sukurti naują puslapį user.html, kuriame bus atvaizduojama vartotojo informacija:
// 3.1. Pilnas vardas.
// 3.2. Vartotojo vardas / nick'as.
// 3.3. El. paštas.
// 3.4. Adresas, kuris turės gatvę, namo numerį, miestą, pašto kodą. Paspaudus ant adreso, pagal koordinates, turėtų atidaryti šios vietos Google Maps. Kol kas naudoti bet kokią Google Map vietovę.
// 3.5. Telefono numeris.
// 3.6. Internetinio puslapio adresas.
// 3.7. Įmonės, kurioje dirba, pavadinimas.

// 4. Šiame puslapyje turės būti atvaizduojama:
// 4.1. Visi vartotojo parašyti įrašai (posts). Post'ų įrašuose nereikia atvaizduoti komentarų. Kiekvienas post'as turi turėti nuorodą.
// 4.2. Visi vartotojo sukurti foto albumai. Kiekvienas albumas turės:
// 4.2.1. Albumo pavadinimą, kuris turi būti nuoroda. Kol kas nuoroda gali niekur nevesti.
let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let userIdNum = urlParams.get(`user_id`);
console.log(userIdNum)

fetch(`https://jsonplaceholder.typicode.com/users/${userIdNum}`)
.then(res=>res.json())
.then(user => {
    console.log(user)
        let userProfile = document.createElement(`div`);
        userProfile.classList.add(`user-profile-card`)
        let userId = document.createElement(`p`);
        userId.textContent = `Id: ${user.id}`;
        let userFullName = document.createElement(`p`);
        userFullName.textContent = `Full name: ${user.name}`;
        let userNickName = document.createElement(`p`);
        userNickName.textContent = `Nick name: ${user.username}`;
        let userEmail = document.createElement(`p`);
        userEmail.textContent = `Email: ${user.email}`;
        let userPhone = document.createElement(`p`);
        userPhone.textContent = `Phone: ${user.phone}`;
        let userWeb = document.createElement(`p`);
        userWeb.textContent = `Web page: ${user.website}`;
        let userCompany = document.createElement(`p`);
        userCompany.textContent = `Company name: ${user.company.name}`;
        let userAddress = document.createElement(`span`);
        userAddress.textContent = `Address: `;
        let userAddressLink = document.createElement(`a`);
        userAddressLink.textContent = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}.`
        let mapLan = user.address.geo.lat;
        let mapLng = user.address.geo.lng;
        userAddressLink.href = `http://maps.google.com/maps?q=${mapLan},${mapLng}`
        userAddressLink.target = `_blank`
        let postsWrapper = document.createElement(`div`)
        let posts = document.createElement(`h4`)
        posts.textContent = `User posts:`
        let albumsWrapper = document.createElement(`div`);
        let albums = document.createElement(`h4`)
        albums.textContent = `User albums:`

        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userIdNum}`)
        .then(res=>res.json())
        .then(posts=> {
            posts.map(post=> {

            let postEl = document.createElement(`p`)
            postEl.textContent = `${post.body}. `
            let postSpan = document.createElement(`span`);
            let postLink = document.createElement(`a`);
            postLink.href = `./post.html?post_id=${post.id}`
            postLink.textContent = `Go to post`

            postsWrapper.append(postEl)
            postEl.append(postSpan)
            postSpan.after(postLink)
            })
        })
        fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userIdNum}`)
        .then(res=>res.json())
        .then(albums => {
            console.log(albums)
            albums.map(album => {
                let albumEl = document.createElement(`p`);
                albumEl.textContent = `${album.title} `
                let albumSpan = document.createElement(`span`);
                let albumLink = document.createElement(`a`);
                albumLink.href = `./album.html?album_id=${album.id}`
                albumLink.textContent = `About album`

                albumsWrapper.append(albumEl)
                albumEl.append(albumSpan)
                albumSpan.after(albumLink)
                
            })
        })

        document.querySelector(`body`).append(userProfile);
        userProfile.append(userId, userFullName, userNickName, userEmail, userPhone, userWeb, userCompany, userAddress, postsWrapper, albumsWrapper);
        postsWrapper.append(posts)
        albumsWrapper.append(albums)
        userAddress.append(userAddressLink)

})
.catch(error => {
    console.log(error)
    let errorMessage = document.createElement(`h1`)
    errorMessage.textContent = `Vartotojo nera`

    document.body.prepend(errorMessage)
})


