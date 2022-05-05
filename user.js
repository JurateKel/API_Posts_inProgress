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
        let userAddress = document.createElement(`div`);
        userAddress.textContent = `Address: `;
        let userAddressLink = document.createElement(`a`);
        let userAddressStreet = document.createElement(`span`);
        userAddressStreet.textContent = `${user.address.street}, `;
        let userAddressSuite = document.createElement(`span`);
        userAddressSuite.textContent = `${user.address.suite}, `;
        let userAddressCity = document.createElement(`span`);
        userAddressCity.textContent = `${user.address.city}, `;
        let userAddressZipcode = document.createElement(`span`);
        userAddressZipcode.textContent = `${user.address.zipcode}.`;
        let userAddressMap = document.createElement(`div`);
        let userAddressMapIframe = document.createElement(`iframe`);



        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userIdNum}`)
        .then(res=>res.json())
        .then(posts=> {
            posts.map(post=> {
            let postEl = document.createElement(`p`)
            postEl.textContent = post.body

            userProfile.append(postEl)
            })


        })

        document.querySelector(`body`).append(userProfile);
        userProfile.append(userId, userFullName, userNickName, userEmail, userPhone, userWeb, userCompany, userAddress);
        userAddress.append(userAddressLink)
        userAddressLink.append(userAddressStreet, userAddressSuite, userAddressCity, userAddressZipcode, userAddressMap)
        userAddressMap.append(userAddressMapIframe)
})
.catch(error => {
    let errorMessage = document.createElement(`h1`)
    errorMessage.textContent = `Vartotojo nera`

    document.body.prepend(errorMessage)
})

