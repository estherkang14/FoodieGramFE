const baseUrl = "http://localhost:3000/api/v1/"
const userUrl = baseUrl + "users"
const postUrl = baseUrl + "posts"
const commentsUrl = baseUrl + "comments"
const likesUrl = baseUrl + "likes"
let allUsers 
let currentUser 

document.addEventListener("DOMContentLoaded", () => {
    const userLoginForm = document.getElementById("login-form")
    const loginTextField = document.getElementById("username-field")
    const userList = document.getElementById("user-list")
    
    //Get and set the allUsers var
    const getUserApi = () => {
        fetch(userUrl)
        .then(res => res.json())
        .then(users => {
            allUsers = users
            rendersUsers()
            
        })
    }
    //renders the side panel userlist
    const rendersUsers = () => {
        //probably can be put in it's many other functions
        userLoginForm.addEventListener('submit', (e) => {
            e.preventDefault()
            logincheck()
            allUsers.forEach(user => renderUserList(user, userList))
        })
        
        
        // here to 41 can probably be the foreach and the if statement
    }
    
    const logincheck = () =>{
        allUsers.forEach(user => {
            if(user.username === loginTextField.value){
                currentUser = user
                removeUserListChildren(userList)
                fetchFeed()

                const logo = document.getElementById("app-name")
                logo.addEventListener('click', (e) => {
                    fetchFeed()
                })
                // look to line 45 for lines 51 to 106
                const topBar = document.getElementById('top-info')
                const addPostBtn = document.createElement('button')
                addPostBtn.innerText = "Add a Post"
                addPostBtn.classList += "trigger"
                
                topBar.appendChild(addPostBtn)
                const modalDiv = document.createElement('div')
                modalDiv.classList += "modal"
                topBar.appendChild(modalDiv)

                const modalContent = document.createElement('div')
                modalContent.classList += "modal-content"
                modalDiv.appendChild(modalContent)

                const modalSpan = document.createElement('span')
                modalSpan.classList += "close-button"
                modalSpan.innerHTML = "&times;"
                modalContent.appendChild(modalSpan)

                const addPostForm = document.createElement('form')
                modalContent.appendChild(addPostForm)

                const imageUrlInput = document.createElement('input')
                imageUrlInput.type = 'text'
                imageUrlInput.placeholder = 'Image URL Here'
                addPostForm.appendChild(imageUrlInput)

                const captionInput = document.createElement('input')
                captionInput.type = 'textField'
                captionInput.placeholder = "Write a Caption"
                addPostForm.appendChild(captionInput)

                const submitPostBtn = document.createElement('input')
                submitPostBtn.type = 'submit'
                submitPostBtn.innerText = "Post"
                addPostForm.appendChild(submitPostBtn)

                addPostForm.addEventListener('submit', (e) => {
                    e.preventDefault()
                    postAPost(user, imageUrlInput, captionInput)
                })

                function toggleModal() {
                    modalDiv.classList.toggle("show-modal");
                }
            
                function windowOnClick(event) {
                    if (event.target === modalDiv) {
                        toggleModal();
                    }
                }
                
                addPostBtn.addEventListener("click", toggleModal);
                modalSpan.addEventListener("click", toggleModal);
                window.addEventListener("click", windowOnClick);
            }
        })
    }  
    
    const fetchFeed = () => {
        fetch(postUrl)
        .then(res => res.json())
        .then(posts => showFeed(posts))
    }

    
    const showFeed = (posts) => {
        // lines 122 &123 gets the Show panel then clears it so we have a blank canvas to work with
        const showPanel = document.getElementById('show-panel')
        removeShowPanelChildren(showPanel)

        // creates a div container for us to place our list of feed post then appends it to the show panel.
        const feedDiv = document.createElement('div')
        feedDiv.id = 'feed-div'
        showPanel.appendChild(feedDiv)

        // making each post then adding them to the feed div
        const feedList = document.createElement('list')
        feedList.li = 'all-posts-list'
        feedDiv.appendChild(feedList)


        posts.forEach(post => showAllPosts(post, showPanel, feedList))

        console.log(feedDiv)
        feedDiv.addEventListener("click", (e) => {
            if(e.target.className === "post-img"){
                const postImg = e.target
                postPage(postImg)
            }
        })
    }
    const postPage = (postImg) => {
        fetch(`${postUrl}/${postImg.dataset.id}`)
        .then(res => res.json())
        .then(post => postShowPage(post))
    }
    const postShowPage = (post) => {
        const showPanel = document.getElementById("show-panel")
        removeShowPanelChildren(showPanel)

        const div = document.createElement('div')
        div.id = "post-show-page"
        div.name = "delete-me"
        showPanel.appendChild(div)

        const img = document.createElement('img')
        img.src= post.image_url
        div.appendChild(img)

        const likes = document.createElement('p')
        if(post.likes){
            likes.innerHTML = `${post.likes.length} Like(s)`
            div.appendChild(likes)
        } else {
            likes.innerHTML = "0 likes"
            div.appendChild(likes)
        }


        // if(post.user.id === currentUser.id){
        //     console.log("hey")
        //     const deleteButton = document.createElement('button')
        //     deleteButton.innerText = "delete post"
        //     div.appendChild(deleteButton)

        //     deleteButton.addEventListener('click', (e) =>{
        //         fetch(`${postUrl}/${post.id}`,{method: "DELETE"})
        //         .then(res => res.json())
        //         .then(post => )
        //     })
        // }

        const caption = document.createElement('p')
        caption.textContent = post.caption
        div.appendChild(caption)

        const commentDiv = document.createElement('div')
        div.appendChild(commentDiv)
        const commentList = document.createElement('ul')
        commentDiv.appendChild(commentList)
        if(post.comments){
            post.comments.forEach(comment => {
                const commentli = document.createElement('li')
                commentli.innerHTML = `${comment.text} - <span class='btn-danger'> &times </span>`
                commentli.id = comment.id
                commentList.appendChild(commentli)
            })
        }
        commentDiv.addEventListener('click', (e) => {
            if(e.target.className === 'btn-danger') {
                let commentLi = e.target.parentNode
                deleteComment(commentLi) 
                console.log(commentId)
            }
        })
        const deleteComment = (commentLi) => {
            fetch(`${commentsUrl}/${commentLi.id}`,{method: "DELETE"})
            .then(res => res.json())
            .then(commentLi.remove())
        }
    }
    const showAllPosts = (post, showPanel, feedList) => {
        const li = document.createElement('li')
        li.dataset.id = post.id
        feedList.appendChild(li)

        const img = document.createElement('img')
        img.src = post.image_url
        img.dataset.id = post.id
        img.className = "post-img"
        li.appendChild(img)
    }

    const renderUserList = (user, userList) => {


        const userLi = document.createElement("li")
        userList.appendChild(userLi)
        userLi.innerText = user.username
        userLi.dataset.id = user.id
        userLi.className = "list-item"
        userLi.addEventListener('click', (e) => {
            if(e.target.innerText === user.username){
                rendersUser(user)
                // console.log(e.target)
            }
            
        })
        // const userLoginForm = document.getElementById("login-form")
        // console.log(userLoginForm)
        
    }

    const removeUserListChildren = (userList) => {
        while (userList.firstChild) {
            userList.removeChild(userList.firstChild)
        }
    }

    const rendersUser = (user) => {
        const showPanel = document.getElementById('show-panel')
        removeShowPanelChildren(showPanel)

        const profileInfoDiv = document.createElement('div')
        profileInfoDiv.id = 'profile-info'
        showPanel.appendChild(profileInfoDiv)
        
        const userName = document.createElement("h3")
        userName.innerText = user.username
        profileInfoDiv.appendChild(userName)

        const userProfilePic = document.createElement("img")
        userProfilePic.src = user.profilepic 
        profileInfoDiv.appendChild(userProfilePic)

        const userBio = document.createElement("p")
        userBio.textContent = user.bio 
        profileInfoDiv.appendChild(userBio)

        const main = document.createElement("main")
        main.id = 'profile-post'
        showPanel.appendChild(main)
        removeAllPosts(main)

        const usersPosts = user.posts 
        renderPosts(usersPosts, main, user)

        main.addEventListener("click", (e) => {
            console.log(e.target.parentNode)
            if(e.target.parentNode.className === "card"){
                const x = e.target
                postPage(x)
            }
        })
    }

    const renderPosts = (usersPosts, main, user) => {
        usersPosts.forEach(post => renderPost(post, main, user))
    }

    const renderPost = (post, main, user) => {
        const postDiv = document.createElement('div')
        main.appendChild(postDiv)
        postDiv.classList += 'card'
        const image = document.createElement('img')
        image.src = post.image_url
        image.dataset.id = post.id
        postDiv.appendChild(image)
        console.log(post)
    }

    const removeShowPanelChildren = (showPanel) => {
        while (showPanel.firstChild) {
            showPanel.removeChild(showPanel.firstChild)
        }
    }

    const removeAllPosts = (main) => {
        while (main.firstChild) {
            main.removeChild(main.firstChild)
        }
    }

    const postAPost = (user, imageUrlInput, captionInput) => {
        fetch(postUrl,{
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Accepts: "application/json"
            },
            body: JSON.stringify({
                image_url: imageUrlInput.value,
                caption: captionInput.value,
                user_id: currentUser.id
            })
        })
        .then(res => res.json())
        .then(post => {
            user.posts.push(post)
            console.log(user.posts)
            rendersUser(user)
        })
    }


    getUserApi()
})


// Comeback to this



//step1 find and the post add a click event
//step2 get the post info
//step3 then display on screen


