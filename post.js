let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let postId = urlParams.get(`post_id`)
let commentsWrapper = document.createElement(`div`)


fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
.then(res=>res.json())
.then(post => {
    console.log(post)
    let postWrapper = document.createElement(`div`)
    let postTitle = document.createElement(`h1`)
    postTitle.textContent = post.title
    let postBody = document.createElement(`p`)
    for (let i=0; i<10; i++){
    postBody.textContent += post.body}

    let authorName = document.createElement(`span`)
    fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
    .then(res=>res.json())
    .then(user => {
        authorName.innerHTML = `<strong>Post author: </strong> <a href="./user.html?user_id=${user.id}">${user.name}</a>`
    })

    let morePosts = document.createElement(`a`)
    morePosts.textContent = `More posts...`
    morePosts.href = `./posts.html?user_id=${post.userId}`

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(res=>res.json())
    .then(comments => {
        comments.map(comment => {
            console.log(comment)
            let commentEl = document.createElement(`div`)
            commentEl.innerHTML = `<h3>${comment.name}</h3> <span>Commented by: ${comment.email}</span> <p>${comment.body}</p>`
            commentsWrapper.append(commentEl)
        })
    })

    postWrapper.append(postTitle, authorName, postBody, morePosts, commentsWrapper)
    document.body.prepend(postWrapper)
})