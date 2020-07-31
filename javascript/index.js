const baseUrl = "http://localhost:3000/api/v1/"
const userUrl = baseUrl + "users"
const postUrl = baseUrl + "posts"
const commentsUrl = baseUrl + "comments"
const likesUrl = baseUrl + "likes"
let allUsers 
let currentUser 
let allUsersUserName = []

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
            allUsers.forEach(user => allUsersUserName.push(user.username))
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
            loginTextField.value = ""
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

                const topInfo = document.getElementById('top-info')
                const profileButton = document.createElement('button')
                profileButton.id = 'profile-button'
                profileButton.innerText = "My Profile"
                topInfo.appendChild(profileButton)
                
                profileButton.addEventListener('click', (e) => {
                    rendersUser(currentUser)
                })
                // look to line 45 for lines 51 to 106
                const topBar = document.getElementById('top-info')
                const addPostBtn = document.createElement('button')
                addPostBtn.innerText = "Add a Post"
                addPostBtn.classList += "trigger"
                addPostBtn.classList += "top-linksli"
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
                    toggleModal()
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

                if (currentUser !== null || undefined) {
                    let loginForm = document.getElementById('login-form')
                    let signUp = document.getElementById('sign-up')
                    loginForm.remove()
                    signUp.remove()
                    const logOut = document.createElement('button')
                    logOut.innerText = 'Log Out'
                    logOut.id = 'log-out'
                    topBar.appendChild(logOut)
                    console.log("Hello!")

                    logOut.addEventListener('click', () => { 
                        alert("You are now logged out! Goodbye!")
                        window.location.reload()
                    })
                }
            } 
        })
    }  
    
    const signUp  = () => {
        const signUpBtn = document.getElementById('sign-up')
        const upperBar = document.getElementById('top-nav-bar')
        
        const mainHolder = document.createElement('div')
        mainHolder.classList += 'modal'
        upperBar.appendChild(mainHolder)
        
        const formHolder = document.createElement('div')
        formHolder.classList += 'modal-content'
        mainHolder.appendChild(formHolder)
        
        const newUserForm = document.createElement('form')
        newUserForm.id = 'sign-up-form'

        formHolder.appendChild(newUserForm)
        
        const newName = document.createElement('input')
        newName.type='text'
        newName.placeholder='Username Here'
        newName.id = 'signUp-name'
        newUserForm.appendChild(newName)
        
        const newBio = document.createElement('input')
        newBio.type='textfield'
        newBio.placeholder='Tell us about yourself'
        newBio.id = 'signUp-bio'
        newUserForm.appendChild(newBio)

        const newProfilePic = document.createElement('input')
        newProfilePic.type='text'
        newProfilePic.placeholder='Img URL here'
        newProfilePic.id = 'signUp-Pic'
        newUserForm.appendChild(newProfilePic)

        
        const newSubmit = document.createElement('input')
        newSubmit.type='submit'
        newSubmit.value='Create Account'
        newSubmit.id ='signUp-submit'
        newUserForm.appendChild(newSubmit)
        
        const signUpSpan = document.createElement('span')
        signUpSpan.classList += "close-button"
        signUpSpan.innerHTML = "&times;"
        formHolder.appendChild(signUpSpan)
        
        function toggleModal() {
            mainHolder.classList.toggle("show-modal");
        }
            
        function windowOnClick(event) {
            if (event.target === mainHolder) {
                toggleModal();
            }
        }
        signUpBtn.addEventListener("click", toggleModal);
        signUpSpan.addEventListener("click", toggleModal);
        window.addEventListener("click", windowOnClick);

        newUserForm.addEventListener('submit', (e) => {
            e.preventDefault()
            if(allUsersUserName.includes(newName.value)){
                alert("That name is taken try again")
            }else{
                fetch(userUrl, {
                    method: "POST",
                    body: JSON.stringify({
                        username: newName.value,
                        bio: newBio.value,
                        profilepic: newProfilePic.value
                    }),
                    headers: {
                        'content-type': 'application/json',
                        Accept: 'application/json'
                    }
                })
                .then(res => res.json())
                .then(newUser => {
                    allUsers.push(newUser)
                    // currentUser = newUser
                    console.log("something")
                    toggleModal()
                    alert("Your account has been made please log in!")
                    window.location.reload()
                })
            }
            // console.log(e.target)
        })
    }
    signUp()
    
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

        
        feedDiv.addEventListener("click", (e) => {
            if(e.target.className === "post-img"){
                const postImg = e.target
                postPage(postImg)
            }
        })
    }
    const postPage = (postImg) => {
        console.log(postImg)
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
        img.className = 'post-img'
        img.src= post.image_url
        div.appendChild(img)

        const likes = document.createElement('p')
        likes.dataset.id = post.id 
        if(post.likes){
            likes.innerHTML = `<span class="like-count">${post.likes.length}</span> Like(s) - <span class="like-button">&hearts;</span>`
            div.appendChild(likes)

        } else {
            likes.innerHTML = "<span class='like-count'>0</span> Likes - <span class='like-button'>&hearts;</span>"
            div.appendChild(likes)
        }

        const likeButton = document.querySelector("span.like-button")
        likeButton.addEventListener('click', (e) => {
            e.preventDefault()
            fetch(likesUrl, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Accepts: "application/json"
                },
                body: JSON.stringify({
                    post_id: post.id,
                    user_id: currentUser.id
                })
            })
            .then(resp => resp.json())
            .then(incrementLikes(post,likes))
        })

        const incrementLikes = (post, likes) => {
        
            fetch(`${postUrl}/${likes.dataset.id}`)
            .then(resp => resp.json())
            .then(postPage(likes))
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
        caption.class = 'post-caption'
        div.appendChild(caption)

        const commentDiv = document.createElement('div')
        div.appendChild(commentDiv)
        const commentList = document.createElement('ul')
        commentDiv.appendChild(commentList)
        if(post.comments){
            post.comments.forEach(comment => {
                console.log(comment)
                if (comment.user_id === currentUser.id) {
                const commentli = document.createElement('li')
                commentli.innerHTML = ` ${comment.text} - <span class='btn-danger'> &times </span>`
                commentli.id = comment.id
                commentList.appendChild(commentli)
                } else if (post.user_id === currentUser.id) {
                    const commentli = document.createElement('li')
                    commentli.innerHTML = ` ${comment.text} - <span class='btn-danger'> &times </span>`
                    commentli.id = comment.id
                    commentList.appendChild(commentli)
                } else {
                    const commentli = document.createElement('li')
                    commentli.innerHTML = ` ${comment.text}`
                    commentli.id = comment.id
                    commentList.appendChild(commentli)
                }
            })
        }

        const addCommentButton = document.createElement('button')
        addCommentButton.innerText = "Add a Comment!"
        addCommentButton.id = 'add-comment'
        commentDiv.appendChild(addCommentButton)

        commentDiv.addEventListener('click', (e) => {
            if(e.target.className === 'btn-danger') {
                let commentLi = e.target.parentNode
                deleteComment(commentLi) 
            } else if (e.target.id === 'add-comment') {
                addCommentButton.innerText = "Hide Comment Form"
                addCommentButton.id = 'hide-comment-form'
                const newCommentForm = document.createElement('form')
                
                newCommentForm.dataset.id = post.id
                newCommentForm.id = 'new-comment-form'
                commentDiv.appendChild(newCommentForm)

                newCommentForm.innerHTML = `
                    <label>Comment: </label>
                    <br>
                    <input type="text" name="text">
                    <br>
                    <input type="submit" value="Add Comment">
                `
                newCommentForm.addEventListener('submit', (e) => {
                    e.preventDefault()
                    let commentForm = e.target
                    fetch(commentsUrl, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            'accept': 'application/json'
                        },
                        body: JSON.stringify( {
                            text: commentForm.text.value,
                            user_id: currentUser.id,
                            post_id: post.id
                        })
                    })
                    .then(resp => resp.json())
                    .then(showNewComment(newCommentForm))
                })
                
            } else if (e.target.id === 'hide-comment-form') {
                addCommentButton.innerText = "Add a Comment!"
                addCommentButton.id = 'add-comment'
                let newCommentFormHide = document.getElementById('new-comment-form') 
                commentDiv.removeChild(newCommentFormHide)
            }


        })

        const showNewComment = (newCommentForm) => {
            fetch(`${postUrl}/${newCommentForm.dataset.id}`)
            .then(resp => resp.json())
            .then(postPage(newCommentForm))
    }
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

        const spacing = document.createElement('br')
        userList.appendChild(spacing)
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
        
        const userName = document.createElement("h1")
        userName.innerText = user.username
        profileInfoDiv.appendChild(userName)

        const userProfilePic = document.createElement("img")
        userProfilePic.src = user.profilepic 
        userProfilePic.className = "profile-pic"
        profileInfoDiv.appendChild(userProfilePic)

        const userBio = document.createElement("p")
        userBio.textContent = user.bio 
        profileInfoDiv.appendChild(userBio)

        if (user.id === currentUser.id) {
        const editProfile = document.createElement("button")
        editProfile.dataset.id = currentUser.id
        editProfile.id = "edit-profile-button"
        editProfile.innerText = "Edit Your Profile"
        profileInfoDiv.appendChild(editProfile)
        }
        const spacing = document.createElement('br')
        showPanel.appendChild(spacing)

        profileInfoDiv.addEventListener('click', (e) => {
            if (e.target.id === 'edit-profile-button') {
                let button = e.target 
                button.innerText = "Close Edit"
                button.id = 'close-edit-button'

                const editProfileForm = document.createElement('form')
                editProfileForm.id = 'edit-profile-form'
                // editProfileForm.dataset.id = currentUser.id 
                profileInfoDiv.appendChild(editProfileForm)

                const bioLabel = document.createElement('label')
                bioLabel.innerText = 'Bio: '
                editProfileForm.appendChild(bioLabel)

                const editBioInput = document.createElement('input')
                editBioInput.type ='text'
                editProfileForm.appendChild(editBioInput)
                const brOne = document.createElement('br')
                editProfileForm.appendChild(brOne)

                const profilePicLabel = document.createElement('label')
                profilePicLabel.innerText = 'Profile Picture: '
                editProfileForm.appendChild(profilePicLabel)

                const editProfilePic = document.createElement('input')
                editProfilePic.type = 'text'
                editProfileForm.appendChild(editProfilePic)

                const brTwo = document.createElement('br')
                editProfileForm.appendChild(brTwo)

                const editSubmit = document.createElement('input')
                editSubmit.type = 'submit'
                editSubmit.value = 'finish edit'
                editProfileForm.appendChild(editSubmit)

                console.log(editSubmit)
                editProfileForm.addEventListener('submit', (e) => {
                    e.preventDefault()
                    fetch(`${userUrl}/${currentUser.id}`, {
                        method: 'PATCH',
                        body: JSON.stringify({
                        bio: editBioInput.value ,
                        profilepic: editProfilePic.value
                        }),
                        headers: {
                        'Content-type' : 'application/json',
                        'Accept': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(user => {
                        currentUser = user
                        rendersUser(currentUser)

                    })
                })


                // editProfileForm.innerHTML = `
                // <label>Bio: </label>
                // <input type='text' name='bio'>
                // <br>
                // <label>Profile Picture URL: </label>
                // <input type='text' name='profilepic'>
                // <br>
                // <input type='submit' value='Edit Profile'>
                // `
                // editProfileForm.addEventListener('submit', (e) => {
                //     e.preventDefault()
                //     let editForm = e.target
                
                //     fetch(`${userUrl}/${currentUser.id}`, {
                //         method: 'PATCH',
                //         body: JSON.stringify( {
                //             bio: editForm.bio.value,
                //             profilepic: editForm.profilepic.value
                //         }),
                //         headers: {
                //             'Accept': 'application/json',
                //             'Content-Type': 'application/json'
                //         }
                        
                //     })
                //     .then(resp => resp.json())
                //     .then(console.log)
                // })

            } else if (e.target.id === 'close-edit-button') {
                let button = e.target
                button.innerText = 'Edit Your Profile'
                button.id = "edit-profile-button"
                let editProfileFormHide = document.getElementById('edit-profile-form')
                profileInfoDiv.removeChild(editProfileFormHide)
                console.log('star')
            }
        })

        

        const main = document.createElement("main")
        main.id = 'profile-post'
        showPanel.appendChild(main)
        removeAllPosts(main)

        const usersPosts = user.posts 
        console.log(user.posts)
        renderPosts(usersPosts, main, user)

        main.addEventListener("click", (e) => {
            
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
        image.className = 'post-img'
        image.dataset.id = post.id
        postDiv.appendChild(image)
        
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


