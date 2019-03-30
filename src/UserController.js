let store = require('./Store')

class UserController {
    getAllUsers(req, res) {
        console.log(store);
    }

    getUser(req, res) {
        const user = store.find( (elem) => {
            return elem.id === parseInt(req.params.id);
        })
        console.log(user);
    }

    addUser(req, res) {
        const newUser = req.body;
        newUser.id = store.length + 1;
        store.push(newUser);
        console.log(store);
    }

    deleteUser(req, res) {
        store = store.filter( elem => elem.id !== parseInt(req.params.id));
    }

    changeUser(req, res) {
        if (Object.keys(req.body).length) { // если есть тело запроса
            const user = store.find( (elem) => {
                return elem.id === parseInt(req.params.id);
            })
            if (user) { // если пользователь найден
                for (let key in req.body) {
                    user[key] = req.body[key];
                }
            }
        }
    }
}

module.exports = new UserController;