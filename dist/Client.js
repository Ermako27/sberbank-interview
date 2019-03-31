const serverUrl = 'http://127.0.0.1:8000';

function getAllUsers() {
    const button = document.getElementById('getAllUsers');
    button.addEventListener('click', async (event) => {
        event.preventDefault();
        const url = serverUrl  + '/api/users';
        const response = await fetch(url);

        if (response.status === 200) {
            const data = await response.json();
            const resultDiv = document.getElementById('allUsers_result');
            resultDiv.innerHTML = '';
            data.forEach(elem => {
                const user = `id: ${elem.id}, имя: ${elem.name}, возраст: ${elem.age}`;
                const p = document.createElement('p');
                p.innerText = user;
                resultDiv.appendChild(p);
            });
        }

    });
}

function getOneUser() {
    const form = document.getElementById('oneUserForm');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const url = serverUrl  + '/api/users/' + form.elements['id'].value;
        const response = await fetch(url);

        if (response.status === 200) {
            const data = await response.json();

            const resultDiv = document.getElementById('oneUser_result');
            resultDiv.innerHTML = '';
            const user = `id: ${data.id}, имя: ${data.name}, возраст: ${data.age}`;
            const p = document.createElement('p');
            p.innerText = user;
            resultDiv.appendChild(p);
        } else if (response.status === 404) {
            const resultDiv = document.getElementById('oneUser_result');
            resultDiv.innerHTML = '';
            const user = `Пользователь не найден`;
            const p = document.createElement('p');
            p.innerText = user;
            resultDiv.appendChild(p);
        }   
    });
}

function insertUser() {
    const form = document.getElementById('insertUserForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const body = {
            'name': form.elements['name'].value,
            'age': form.elements['age'].value
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(body)
        };
        const url = serverUrl  + '/api/users';
        const response = await fetch(url, options);

        if (response.status === 200) {
            const data = await response.json();

            const resultDiv = document.getElementById('insertUser_result');
            resultDiv.innerHTML = '';
            const user = `Новенький id: ${data.id}, имя: ${data.name}, возраст: ${data.age}`;
            const p = document.createElement('p');
            p.innerText = user;
            resultDiv.appendChild(p);
        }

    });
}


function updateUser() {
    const form = document.getElementById('updateUserForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const url = serverUrl  + '/api/users/' + form.elements['id'].value;
        const body = Array.from(form.elements).reduce( (acc, val) => {
            if (val.value !== '' && val.name !== 'id' && val.name !== 'submit') {
                acc[val.name] = val.value
            }
            return acc;
        }, {});
        insertUser_result
        const options = {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(body)
        };

        const response = await fetch(url, options);

        if (response.status === 200) {
            const data = await response.json();

            const resultDiv = document.getElementById('updateUser_result');
            resultDiv.innerHTML = '';
            const user = `Измененный пользователь id: ${data.id}, имя: ${data.name}, возраст: ${data.age}`;
            const p = document.createElement('p');
            p.innerText = user;
            resultDiv.appendChild(p);

        } else if (response.status === 404) {
            const resultDiv = document.getElementById('updateUser_result');
            resultDiv.innerHTML = '';
            const user = `Пользователь не найден`;
            const p = document.createElement('p');
            p.innerText = user;
            resultDiv.appendChild(p);
        }
    });
}

function deleteUser() {
    const form = document.getElementById('deleteUserForm');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const url = serverUrl  + '/api/users/' + form.elements['id'].value;
        const options = {
            method: 'DELETE'
        };
        const response = await fetch(url, options);

        if (response.status === 200) {
            const data = await response.json();

            const resultDiv = document.getElementById('deleteUser_result');
            resultDiv.innerHTML = '';
            const user = `Удаленный пользователь: id: ${data.id}, имя: ${data.name}, возраст: ${data.age}`;
            const p = document.createElement('p');
            p.innerText = user;
            resultDiv.appendChild(p);
        } else if (response.status === 404) {
            const resultDiv = document.getElementById('deleteUser_result');
            resultDiv.innerHTML = '';
            const user = `Пользователь не найден`;
            const p = document.createElement('p');
            p.innerText = user;
            resultDiv.appendChild(p);
        }  
    });
}



getAllUsers();
getOneUser();
insertUser();
updateUser();
deleteUser();
