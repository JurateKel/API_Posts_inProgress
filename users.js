const usersWrapper = document.querySelector(`#users-wrapper`)
fetch(`https://jsonplaceholder.typicode.com/users`)
.then(res=>res.json())
.then(users => {
    console.log(users)
    users.map(user => {
        let oneUserWrapper = document.createElement(`div`);
        let userId = document.createElement(`p`);
        let userName = document.createElement(`p`);
        let userUsername = document.createElement(`p`);
        let userEmail = document.createElement(`a`);
        let userEmailSpan = document.createElement(`span`);
        userId.textContent = `User id: ${user.id}`;
        userName.textContent = `Full name: ${user.name}`;
        userUsername.textContent = `User name: ${user.username}`;
        userEmail.href = `mailto:${user.email}`;
        userEmail.textContent = user.email;
        userEmailSpan.textContent = `User email: `

        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
        .then(res=>res.json())
        .then(posts => {
            console.log(posts.length)
            let userPostsNum = document.createElement(`p`)
            let userPostsNumLink = document.createElement(`a`)
            userPostsNumLink.href = `./user.html?user_id=${user.id}`
            userPostsNumLink.textContent = `Show all`
            userPostsNum.textContent = `User added ${posts.length} posts. `
            oneUserWrapper.append(userPostsNum)
            userPostsNum.append(userPostsNumLink)
        })
        
        usersWrapper.append(oneUserWrapper)
        oneUserWrapper.append(userId, userName, userUsername, userEmail)
        userEmail.before(userEmailSpan)
        
    })
    

    
})