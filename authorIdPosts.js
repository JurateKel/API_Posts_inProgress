let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let userId = urlParams.get(`user_id`)
console.log(userId)

fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
.then(res=>res.json())
.then(user => {
    user.map(userPost => {
        userPost
    let postWrapper = document.createElement(`div`)
    let postTitle = document.createElement(`h1`)
    postTitle.textContent = userPost.title
    let postBody = document.createElement(`p`)
    for (let i=0; i<10; i++){
    postBody.textContent += userPost.body}

    document.body.append(postWrapper)
    postWrapper.append(postTitle, postBody)
    })

})