let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let postId = urlParams.get(`post_id`)

async function getPostById(postIdNum) {
    const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${postIdNum}`)
    const postData = await postRes.json()
    return postData
}
async function getuserByPost(postUserId) {
    const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${postUserId}`)
    const userData = await userRes.json()
    return userData
}
async function getPostComments(postId) {
    const commentsRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    const commentsData = await commentsRes.json()
    return commentsData
}

(async () => {
    const post = await getPostById(postId)
    const user = await getuserByPost(post.userId)
    const comments = await getPostComments(post.id)
    const postWrapper = document.querySelector(`#post`)
    const commentsWrapper = document.querySelector(`#comments`)


    const postTitle = document.createElement(`h1`)
    const postBody = document.createElement(`p`)
    const authorName = document.createElement(`span`)
    const morePosts = document.createElement(`a`)
    for (let i=0; i<10; i++){
        postBody.textContent += post.body}
    postTitle.textContent = post.title
    authorName.innerHTML = `<strong>Post author: </strong> <a href="./user.html?user_id=${user.id}">${user.name}</a>`
    morePosts.textContent = `More posts...`
    morePosts.href = `./posts.html?user_id=${post.userId}`
    comments.map(comment => {
        const commentEl = document.createElement(`div`)
        commentEl.innerHTML = `<h4>${comment.name}</h4> <span>Commented by: <a href="mailto:${comment.email}">${comment.email}</a></span> <p>${comment.body}</p>`
        commentsWrapper.append(commentEl)
    })
    postWrapper.append(postTitle, authorName, postBody, morePosts)
})()
