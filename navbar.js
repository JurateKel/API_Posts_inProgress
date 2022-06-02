const navBarWrapper = document.createElement(`nav`);
document.body.prepend(navBarWrapper)

const mainPage = document.createElement(`button`);
const mainPageLink = document.createElement(`a`);
mainPage.classList.add(`btn`, `btn-outline-primary`)
mainPageLink.textContent = `Main page`
mainPageLink.href = `./index.html`
const albums = document.createElement(`button`);
const albumsLink = document.createElement(`a`);
albums.classList.add(`btn`, `btn-outline-primary`)
albumsLink.textContent = `Albums`
albumsLink.href = `./albums.html`
const posts = document.createElement(`button`);
const postsLink = document.createElement(`a`);
posts.classList.add(`btn`, `btn-outline-primary`)
postsLink.textContent = `Posts`
postsLink.href = `./posts.html`

mainPage.append(mainPageLink)
albums.append(albumsLink)
posts.append(postsLink)
navBarWrapper.append(mainPage, albums, posts)