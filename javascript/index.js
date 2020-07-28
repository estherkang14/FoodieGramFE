const baseUrl = "http://localhost:3000/api/v1/"
const userUrl = baseUrl + "users"
const postUrl = baseUrl + "posts"
const commentsUrl = baseUrl + "comments"
const likesUrl = baseUrl + "likes"

document.addEventListener("DOMContentLoaded", () => {
    console.log(userUrl)
    const getUserApi = () => {
        fetch(userUrl)
        .then(res => res.json())
        .then(users => rendersUsers(users))
    }

    const rendersUsers = (users) => {
        users.forEach(user => renderUserList(user))
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
                console.log(e.target)
            }
            
        })
        
    }

    const sideNavBarDiv = document.getElementById("side-nav-bar")

    // sideNavBarDiv.addEventListener('click', (e) => {
    //     if(e.target.class = "list-item"){
            
    //         console.log(e.target)
    //     }
    // })
    const rendersUser = (user) => {
        const profileInfoDiv = document.getElementById("profile-info")
        
        const userName = document.createElement("h3")
        userName.innerText = user.username
        profileInfoDiv.appendChild(userName)
    }

    getUserApi()
})