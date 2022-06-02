const albumsWrapper= document.querySelector(`#albums-wrapper`)
const postsWrapper = document.querySelector(`#posts-wrapper`)


async function getPosts() {
    let postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=12`)
    let postsData = await postsResponse.json()
    return postsData
}
async function getUser(userId) {
    let userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    let userData = await userResponse.json()
    return userData
}
async function getCommentsOfPost(postId) {
    let postCommentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    let postCommentsData = await postCommentsResponse.json()
    return postCommentsData
}
async function getAlbums() {
    let albumsResponse = await fetch(`https://jsonplaceholder.typicode.com/albums?_limit=8`)
    let albumsData = await albumsResponse.json()
    return albumsData
}

async function getAlbumsUserData(albumUserId) {
    const albumUsersRes = await fetch(`https://jsonplaceholder.typicode.com/users/${albumUserId}`)
    const albumUsersData = await albumUsersRes.json()
    return albumUsersData
}

async function renderPosts() {
    const posts = await getPosts();
    posts.map(async post => {
        const title = post.title;
        const body = post.body;
        const userId = post.userId;
        const postId = post.id;
        const postElement = document.createElement(`div`);
        const postTitle = document.createElement(`h5`);
        const postAuthor = document.createElement(`span`);
        const postBody = document.createElement(`p`);
        const authorLink = document.createElement(`a`);
        const showMoreComments = document.createElement(`a`);
        const postCommentsWrapper = document.createElement(`div`);
        postBody.classList.add(`card-text`);
        postTitle.classList.add(`card-title`);
        postElement.classList.add(`card`);

        const user = await getUser(userId);
        postTitle.textContent = title;
        postBody.textContent = body;
        postAuthor.textContent = `Author: `
        authorLink.href = `./user.html?user_id=${userId}`;
        authorLink.textContent = user.name;

        const postComments = await getCommentsOfPost(postId);
        postComments.map(async comment => {
            const postComment = document.createElement(`div`);
            const commentName = document.createElement(`h2`);
            const commentButton = document.createElement(`button`);
            const commentTextAccordion = document.createElement(`div`);
            const commentBody = document.createElement(`div`);
            const commentUserEmail = document.createElement(`p`);
            const commentUserEmailLink = document.createElement(`a`);
            postCommentsWrapper.classList.add(`accordion`, `accordion-flush`, `collapse`)
            postCommentsWrapper.setAttribute(`id`, `multiCollapse${postId}`);
            postComment.classList.add(`accordion-item`)
            commentName.setAttribute(`id`, `flush-heading${comment.id}`);
            commentName.classList.add(`accordion-header`);
            commentName.dataset.bsToggle = `collapse`;
            commentName.dataset.bsTarget =`#flush-collapse${comment.id}`;
            commentName.setAttribute(`aria-expanded`, `false`);
            commentName.setAttribute(`aria-controls`, `flush-collapse${comment.id}`);
            commentTextAccordion.setAttribute(`id`, `flush-collapse${comment.id}`)
            commentTextAccordion.setAttribute(`aria-labelledby`,`flush-heading${comment.id}`)
            commentTextAccordion.setAttribute(`data-bs-parent`,`#accordionFlushExample`)
            commentTextAccordion.classList.add(`accordion-collapse`, `collapse`)
            commentBody.classList.add(`accordion-body`)
            commentButton.classList.add(`accordion-button`, `collapsed`)
            commentButton.textContent = comment.name;
            commentBody.textContent = comment.body;
            commentUserEmailLink.href = `mailto:#`;
            commentUserEmailLink.textContent = comment.email;
            commentUserEmail.textContent = `User mail: `;
            
            
            showMoreComments.setAttribute(`data-bs-toggle`, `collapse`);
            showMoreComments.setAttribute(`aria-controls`, `multiCollapse${postId}`);
            showMoreComments.setAttribute(`aria-expanded`, `false`);
            showMoreComments.setAttribute(`role`, `button`);
            showMoreComments.setAttribute(`data-bs-parent`,`#accordion`);
            showMoreComments.textContent = `Show comments`;
            showMoreComments.href = `#multiCollapse${postId}`;
            showMoreComments.addEventListener(`click`, e => {
                e.preventDefault();
                if (e.target.ariaExpanded === `true`) {
                    e.target.textContent = `Hide comments`;
                    postCommentsWrapper.classList.add(`show`)
                } else {
                    e.target.textContent = `Show comments`;
                }
            })
            commentName.append(commentButton)
            commentTextAccordion.append(commentBody)
            commentBody.append(commentUserEmail)
            postComment.append(commentName, commentTextAccordion)
            postCommentsWrapper.append(postComment)
            commentUserEmail.append(commentUserEmailLink)
        })
    postsWrapper.append(postElement)
    postElement.append(postTitle, postAuthor, postBody, postCommentsWrapper, showMoreComments)
    postAuthor.append(authorLink)
    })
}
renderPosts()

async function renderAlbums() {
    const albums = await getAlbums();
    let number = 1
    albums.map(async album => {
        const albumUserData = await getAlbumsUserData(album.userId);
        let albumElement = document.createElement(`div`);
        let albumImg = document.createElement(`img`)
        let albumBody = document.createElement(`div`);
        let albumTitleLink = document.createElement(`a`);
        let albumTitle = document.createElement(`h5`);
        let albumAuthor = document.createElement(`span`);
        let albumAuthorLink = document.createElement(`a`);
        albumElement.classList.add(`card`);
        albumImg.classList.add(`card-img-top`);
        albumBody.classList.add(`car-body`);
        albumTitleLink.href = `./album.html?album_id=${album.id}`;
        albumTitle.textContent = album.title;
        albumTitle.classList.add(`card-title`);
        albumAuthor.textContent = `Album author: `;
        albumAuthorLink.textContent = `${albumUserData.name}`;
        albumAuthorLink.href = `./user.html?user_id=${albumUserData.id}`;
        albumImg.src = `https://picsum.photos/200/200?random=${number}`;
        number++

        albumsWrapper.append(albumElement)
        albumElement.append(albumImg, albumBody)
        albumBody.append(albumTitleLink, albumAuthor)
        albumTitleLink.append(albumTitle)
        albumAuthor.after(albumAuthorLink)
    })
}
renderAlbums()
