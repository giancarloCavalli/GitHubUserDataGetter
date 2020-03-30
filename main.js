let ulElement = document.querySelector('ul');
let inpElement = document.querySelector('#inpUser');
let btnElement = document.querySelector('#btn');
let userData = document.querySelector('#userData');
let users = [];

const findUser = function(lista, user) {
    const index = lista.findIndex(function(usuario, index) {
        return usuario.login === user;
    })
    return index
}

var minhaPromise = function(user) {
    return new Promise(function(resolve,reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET',`https://api.github.com/users/${user}`);
        xhr.send(null);

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                reject('Erro na requisição');
                }
            } 
        }
    });
}

function addUser() {
    var user = inpElement.value;
    inpElement.value = '';
    inpElement.focus();
    minhaPromise(user)
        .then(function(response) {
            console.log(response);
            findUser(users, user) == -1 ? users.push(response) : 1==1;
            let pos = findUser(users, user);
            renderUserData(pos);
            renderUsers();
        })
        .catch(function(error) {
            console.warn(error);
            userData.innerHTML = `Usuário <strong>${user}</strong> não encontrado!`;
        });
}

function renderUserData(pos) {
    userData.innerText = JSON.stringify(users[pos]);

}

function renderUsers() {
    ulElement.innerHTML = ''
    for(i in users) {
        let itemLista = document.createElement('li');
        itemLista.setAttribute('name', `user${i}`);
        itemLista.innerText = users[i].login;
        ulElement.appendChild(itemLista);
    }
}