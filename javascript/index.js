const baseUrl = "http://localhost:3000/api/v1/"
const userUrl = baseUrl + "users"
const postUrl = baseUrl + "posts"
const commentsUrl = baseUrl + "comments"
const likesUrl = baseUrl + "likes"
let currentUser = 

document.addEventListener("DOMContentLoaded", () => {
    const getUserApi = () => {
        fetch(userUrl)
        .then(res => res.json())
        .then(users => rendersUsers(users))
    }
    console.log(userUrl)

    const rendersUsers = (users) => {
        users.forEach(user => renderUserList(user))
        
        const userLoginForm = document.getElementById("login-form")
        const loginTextField = document.getElementById("username-field")
        userLoginForm.addEventListener('submit', (e) => {
            e.preventDefault()
            // console.log("this is1", loginTextField.value)

            users.forEach(element => {
                // console.log(element.username)
                // console.log(loginTextField.value)
                if(element.username === loginTextField.value){
                    currentUser = element.id
                    
                    // console.log("my id is:", currentUser) Show esther
                }
            })
        })
        console.log(userLoginForm)
    }

    const renderUserList = (user) => {
        const userList = document.getElementById("user-list")
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

    const sideNavBarDiv = document.getElementById("side-nav-bar")

    // sideNavBarDiv.addEventListener('click', (e) => {
    //     if(e.target.class = "list-item"){
            
    //         console.log(e.target)
    //     }
    // })
    const rendersUser = (user) => {
        const profileInfoDiv = document.getElementById("profile-info")
        removeAllDivChildren(profileInfoDiv)
        
        const userName = document.createElement("h3")
        userName.innerText = user.username
        profileInfoDiv.appendChild(userName)

        const userProfilePic = document.createElement("img")
        userProfilePic.src = user.profilepic 
        profileInfoDiv.appendChild(userProfilePic)

        const userBio = document.createElement("p")
        userBio.textContent = user.bio 
        profileInfoDiv.appendChild(userBio)

        const main = document.getElementById('profile-post')
        removeAllPosts(main)

        const usersPosts = user.posts 
        renderPosts(usersPosts, main, user)
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
        postDiv.appendChild(image)
        console.log(post)
    }

    const removeAllDivChildren = (profileInfoDiv) => {
        while (profileInfoDiv.firstChild) {
            profileInfoDiv.removeChild(profileInfoDiv.firstChild)
        }
    }

    const removeAllPosts = (main) => {
        while (main.firstChild) {
            main.removeChild(main.firstChild)
        }
    }

    

    getUserApi()
})


// const curUser = 

// const text = document.getElementById("username input")

// Form.addEventListener('submit', (e) => {
//     if(text.value === user.username){
//         curUser = user.id
//     }

// })

