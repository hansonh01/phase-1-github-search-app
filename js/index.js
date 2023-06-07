document.addEventListener('DOMContentLoaded',()=>{
    const searchForm = document.querySelector('form')
    searchForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        const searchInput = document.getElementById('search').value.trim();
        searchUsers(searchInput);
    });
})

function searchUsers(input){
    const apiUrl = `https://api.github.com/search/users?q=${input}`;
    fetch(apiUrl, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(resp=>resp.json())
    .then(data => {
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';
        data.items.forEach(user=>{
            const userItem = document.createElement('li');
            userItem.classList.add('user');

            const userAvatar = document.createElement('img');
            userAvatar.src = user.avatar_url;
            userItem.appendChild(userAvatar);

            const userName = document.createElement('a');
            userName.href = user.html_url;
            userName.textContent = user.login;
            userItem.appendChild(userName);

            userList.appendChild(userItem);
        })
        userList.addEventListener('click',(e)=>{
            e.preventDefault();
            if (e.target.tagName === 'A'){
                const userLogin = e.target.innerText;
                userRepositories(userLogin);
            }
        })
    })
}

function userRepositories(login){
    const apiUrl = `https://api.github.com/users/${login}/repos`;
    fetch(apiUrl,{
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(resp=>resp.json())
    .then(data=>{
        const reposList = document.getElementById('repos-list');
        reposList.innerHTML = '';
        data.forEach(repo=>{
            const repoItem = document.createElement('li');
            repoItem.textContent = repo.name;
            reposList.appendChild(repoItem);
        })
    })
}