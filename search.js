let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let searchPhrase = urlParams.get(`search`)

let mainContent = document.querySelector('#main-content');
let usersWrapper = document.createElement('div');
usersWrapper.classList.add('users-wrapper');
let postsWrapper = document.createElement('div');
postsWrapper.classList.add('posts-wrapper');
let albumsWrapper = document.createElement('div');
albumsWrapper.classList.add('albums-wrapper');
mainContent.append(usersWrapper, postsWrapper, albumsWrapper);


fetch(`https://jsonplaceholder.typicode.com/users?username=${searchPhrase}`)
.then(res=>res.json())
.then(users => {
    let usersWrapper = document.createElement(`div`)
    usersWrapper.classList.add(`users-wrapper`)

    mainContent.append(usersWrapper)

    if (users.length > 0) {
        usersWrapper.innerHTML = `<h2>Found users:</h2>`
        let usersList = document.createElement(`ul`)
        usersWrapper.append(usersList)

        users.map(user => {
            let userItem = document.createElement(`li`)
            userItem.innerHTML = `<a href="./user.html?user_id=${user.id}">${user.name}</a>`
            usersList.append(userItem)
        })
    } else {
        fetch(`https://jsonplaceholder.typicode.com/users?email=${searchPhrase}`)
        .then(res=>res.json())
        .then(usersByEmail => {
            if (usersByEmail.length > 0) {
                usersWrapper.innerHTML = `<h2>Found users:</h2>`
                let usersList = document.createElement(`ul`)
                usersWrapper.append(usersList)

                usersByEmail.map(userByEmail => {
                    let userItem = document.createElement(`li`)
                    userItem.innerHTML = `<a href="./userhtml?user_id=${userByEmail.id}">${userByEmail.name}</a>`
                    usersList.append(userItem)
                })
            } else {
                fetch(`https://jsonplaceholder.typicode.com/users?name=${searchPhrase}`)
                .then(res=>res.json())
                .then(usersByName => {
                    if (usersByName.length > 0) {
                        usersWrapper.innerHTML = `<h2>Found users:</h2>`
                        let usersList = document.createElement(`ul`)
                        usersWrapper.append(usersList)

                        usersByName.map(userByName => {
                            let userItem = document.createElement(`li`)
                            userItem.innerHTML = `<a href="./userhtml?user_id=${userByName.id}">${userByName.name}</a>`
                            usersList.append(userItem)
                        })
                    } else {
                        usersWrapper.innerHTML = `<h2>No users found</h2>`
                    }
                })
            }
        }) 
    }    
           
})


fetch(`https://jsonplaceholder.typicode.com/posts?title=${searchPhrase}`)
.then(res=>res.json())
.then(posts => {
    let postsWrapper = document.createElement(`div`)
    postsWrapper.classList.add(`posts-wrapper`)

    mainContent.append(postsWrapper)

    if (posts.length > 0) {
        posts.map(post => {

        
        usersWrapper.innerHTML = `<h2>Posts found:</h2>`
        let postsList = document.createElement(`ul`)
        postsWrapper.append(postsList)

        posts.map(post => {
            let postItem = document.createElement(`li`)
            postItem.innerHTML = `<a href="./post.html?post_id=${post.id}">${post.title}</a>`
            postsList.append(postItem)
        })
    })
    } else {
        postsWrapper.innerHTML = `<h2>No posts found</h2>`
    }
})

fetch(`https://jsonplaceholder.typicode.com/albums?title=${searchPhrase}`)
.then(res=>res.json())
.then(albums => {
    let albumsWrapper = document.createElement(`div`)
    albumsWrapper.classList.add(`albums-wrapper`)

    mainContent.append(albumsWrapper)

    if (albums.length > 0) {
        albums.map(album => {

        
        albumsWrapper.innerHTML = `<h2>Posts found:</h2>`
        let albumsList = document.createElement(`ul`)
        albumsWrapper.append(albumsList)

        albums.map(album => {
            let albumItem = document.createElement(`li`)
            albumItem.innerHTML = `<a href="./album.html?album_id=${album.id}">${album.title}</a>`
            albumsList.append(albumItem)
        })
    })
    } else {
        postsWrapper.innerHTML = `<h2>No posts found</h2>`
    }
})

let searchPageForm = document.querySelector(`#search-page-form`)


searchPageForm.addEventListener(`submit`, event => {
    event.preventDefault()

    let searchInput = event.target.elements.search.value.trim().toLowerCase()

    fetch(`https://jsonplaceholder.typicode.com/users`)
    .then(res=>res.json())
    .then(users =>{
        let usersFound = false;
        usersWrapper.innerHTML = `<h2>Found users:</h2>`;
        let usersList = document.createElement('ul');
        usersWrapper.append(usersList);
  
        users.map(user => {
          let name = user.name.toLowerCase();
          let userName = user.username.toLowerCase();
          let email = user.email.toLowerCase();
  
          if (name.includes(searchInput) || userName.includes(searchInput) || email.includes(searchInput)) {
            let userItem = document.createElement('li');
            userItem.innerHTML = `<a href="./user.html?user_id=${user.id}">${user.name}</a>`;
            usersList.append(userItem);
  
            usersFound = true;
          }
        })
  
        if (!usersFound) {
          usersWrapper.innerHTML = `<h2>No users with search text "${searchInput}"</h2>`;
        }


    })

    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(posts => {
      let postsFound = false;
      postsWrapper.innerHTML = `<h2>Posts:</h2>`;
      let postsList = document.createElement('ul');
      postsWrapper.append(postsList);

      posts.map(post => {
        let title = post.title.toLowerCase();

        if (title.includes(searchInput)) {
          let postItem = document.createElement('li');
          postItem.innerHTML = `<a href="./post.html?post_id=${post.id}">${post.title}</a>`
          postsList.append(postItem);
          postsFound = true;
        }
      })

      if (!postsFound) {
        postsWrapper.innerHTML = `<h2>No posts with text <strong>"${searchInput}"</strong></h2>`
      }
    })

    fetch('https://jsonplaceholder.typicode.com/albums')
    .then(res => res.json())
    .then(albums => {
      let albumsFound = false;
      albumsWrapper.innerHTML = `<h2>Albums:</h2>`;
      let albumsList = document.createElement('ul');
      albumsWrapper.append(albumsList);

      albums.map(album => {
        console.log(album);
        let title = album.title.toLowerCase();

        if (title.includes(searchInput)) {
          let albumItem = document.createElement('li');
          albumItem.innerHTML = `<a href="./album.html?album_id=${album.id}">${album.title}</a>`
          albumsList.append(albumItem);
          albumsFound = true;
        }
      })

      if (!albumsFound) {
        albumsWrapper.innerHTML = `<h2>No albums with text "${searchInput}"</h2>`
      }
    })

})