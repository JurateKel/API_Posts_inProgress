fetch(`https://jsonplaceholder.typicode.com/posts?_limit=12`)
.then(res=>res.json())
.then(posts => {
    let postsWrapper = document.createElement(`div`)
    postsWrapper.classList.add(`post-wrapper`)
    document.body.prepend(postsWrapper)


    posts.map((post)=> {
        let title = post.title;
        let body = post.body;
        let userId = post.userId;
        let postId = post.id;
        let postElement = document.createElement(`div`);
        postElement.classList.add(`card`);
        let postTitle = document.createElement(`h5`);
        postTitle.classList.add(`card-title`)
        let postAuthor = document.createElement(`span`);
        let postBody = document.createElement(`p`);
        postBody.classList.add(`card-text`)
        let authorLink = document.createElement(`a`);
        let showMoreComments = document.createElement(`a`);
        let postCommentsWrapper = document.createElement(`div`);


        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(res=>res.json())
        .then(user => {
            postTitle.textContent = title;
            postBody.textContent = body;
            postAuthor.textContent = `Author: `
            authorLink.href = `./user.html?user_id=${userId}`;
            authorLink.textContent = user.name;
        })

        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(res=>res.json())
        .then(comments => {
            comments.map(comment => {
                postCommentsWrapper.classList.add(`accordion`, `accordion-flush`, `collapse`)
                postCommentsWrapper.setAttribute(`id`, `accordion`);
                let postComment = document.createElement(`div`);
                postComment.classList.add(`accordion-item`, `collapse`, `multi-collapse`)
                postComment.setAttribute(`id`, `multiCollapse${postId}`)
                let commentName = document.createElement(`h2`);
                commentName.setAttribute(`id`, `flush-heading${comment.id}`);
                commentName.classList.add(`accordion-header`);
                let commentButton = document.createElement(`button`);
                commentButton.classList.add(`accordion-button`, `collapsed`)
                commentName.setAttribute(`data-bs-toggle`, `collapse`);
                commentName.setAttribute(`data-bs-target`, `#flush-collapse${comment.id}`);
                commentName.setAttribute(`aria-expanded`, `false`);
                commentName.setAttribute(`aria-controls`, `flush-collapse${comment.id}`);
                let commentTextAccordion = document.createElement(`div`);
                commentTextAccordion.setAttribute(`id`, `flush-collapse${comment.id}`)
                commentTextAccordion.setAttribute(`aria-labelledby`,`flush-heading${comment.id}`)
                commentTextAccordion.setAttribute(`data-bs-parent`,`#accordionFlushExample`)
                commentTextAccordion.classList.add(`accordion-collapse`, `collapse`)
                let commentBody = document.createElement(`div`);
                commentBody.classList.add(`accordion-body`)
                let commentUserEmail = document.createElement(`span`);
                let commentUserEmailLink = document.createElement(`a`);
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
                commentTextAccordion.append(commentBody, commentUserEmail)
                postComment.append(commentName, commentTextAccordion)
                postCommentsWrapper.append(postComment)
                commentUserEmail.after(commentUserEmailLink)
            })
        })


        postsWrapper.prepend(postElement)
        postElement.append(postTitle, postAuthor, postBody, postCommentsWrapper, showMoreComments)

        postAuthor.after(authorLink)
        
    })
})

