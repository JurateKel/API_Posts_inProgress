const usersWrapper = document.querySelector(`#users-wrapper`)

async function getUsers() {
    const usersRes = await fetch(`https://jsonplaceholder.typicode.com/users`)
    const usersData = await usersRes.json()
    return usersData
}
async function getUserPosts(userId) {
    const userPostsRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    const userPostsData = await userPostsRes.json()
    return userPostsData
}

(async () => {
    const users = await getUsers();
    users.map(async user => {
        const posts = await getUserPosts(user.id)
        let oneUserWrapper = document.createElement(`div`);
        let userId = document.createElement(`p`);
        let userName = document.createElement(`p`);
        let userUsername = document.createElement(`p`);
        let userEmail = document.createElement(`a`);
        let userEmailSpan = document.createElement(`span`);
        let userPostsNum = document.createElement(`p`)
        let userPostsNumLink = document.createElement(`a`)
        userId.textContent = `User no.: ${user.id}`;
        userName.textContent = `Full name: ${user.name}`;
        userUsername.textContent = `User name: ${user.username}`;
        userEmail.href = `mailto:${user.email}`;
        userEmail.textContent = user.email;
        userEmailSpan.textContent = `User email: `
        userPostsNumLink.href = `./user.html?user_id=${user.id}`
        userPostsNumLink.textContent = `Show all`
        userPostsNum.textContent = `User added ${posts.length} posts. `
        userPostsNum.append(userPostsNumLink)
        usersWrapper.append(oneUserWrapper)
        oneUserWrapper.append(userId, userName, userUsername, userEmail, userPostsNum)
        userEmail.before(userEmailSpan)
    })
})()
