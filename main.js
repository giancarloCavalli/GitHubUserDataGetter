let ulElement = document.querySelector('ul');
let inpElement = document.querySelector('#inpUser');
let btnElement = document.querySelector('#btn');
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
    minhaPromise(user)
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.warn(error);
        });
}

