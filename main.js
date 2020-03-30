let ulElement = document.querySelector('ul');
let inpElement = document.querySelector('#inpUser');
let btnElement = document.querySelector('#btn');
let userData = document.querySelector('#userData');
let users = [];

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
            users.push(response);
            renderUserData();
            rederUsers();
        })
        .catch(function(error) {
            console.warn(error);
        });
}

function renderUserData(objeto) {
    userData.innerText = JSON.stringify(users[users.length-1]);
}

function renderUsers() {
    for(i in users) {

    }
}