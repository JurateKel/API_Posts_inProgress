let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let userId = urlParams.get(`user_id`);

async function getPostsByUserId(userIdNum) {
    const postsByUserRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userIdNum}`);
    const postsByUserData = await postsByUserRes.json()
    return postsByUserData
}
async function getPosts() {
    const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const postsData = await postsRes.json()
    return postsData
}
(async () => {
if (userId) {
    const postsByUser = await getPostsByUserId(userId);
    postsByUser.map(userPost => {
    const postWrapper = document.createElement(`div`);
    const postTitle = document.createElement(`h1`);
    const postBody = document.createElement(`p`);
    postTitle.textContent = userPost.title;
    postBody.textContent += userPost.body;
    document.body.append(postWrapper);
    postWrapper.append(postTitle, postBody);
    });
} else {
    const posts = await getPosts();
    posts.map(userPost => {
    let postWrapper = document.createElement(`div`)
    let postTitle = document.createElement(`h1`)
    let postBody = document.createElement(`p`);
    postTitle.textContent = userPost.title;
    postBody.textContent += userPost.body;
    document.body.append(postWrapper);
    postWrapper.append(postTitle, postBody);
    });
}
})();