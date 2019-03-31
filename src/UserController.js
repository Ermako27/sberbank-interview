let store = require('./Store')

class UserController {
    getAllUsers(req, res) {
        res.status(200).json(store);
    }

    getUser(req, res) {
        const user = store.find( (elem) => { 
            return elem.id === parseInt(req.params.id);
        });
        user ? res.status(200).json(user) : res.status(404).json({message: 'user not found'});
    }

    insertUser(req, res) {
        const newUser = req.body;

        const newId = store.length ? store[store.length-1].id + 1 : 1 
        newUser.id = newId;
        store.push(newUser);
        
        res.status(200).json(newUser);
    }

    deleteUser(req, res) {
        const user = store.find( (elem) => {
            return elem.id === parseInt(req.params.id);
        }) 
        if (!user) { // если пользователь не найден
            res.status(404).json({message: 'user not found'});
        } else {
            store = store.filter( elem => elem.id !== parseInt(req.params.id));
            res.status(200).json(user);
        }
    }

    updateUser(req, res) {
        const user = store.find( (elem) => {
            return elem.id === parseInt(req.params.id);
        }) 
        if (!user) {
            res.status(404).json({message: 'user not found'});
        } else {
            if (Object.keys(req.body).length) { // если есть тело запроса

                for (let key in req.body) {
                    user[key] = req.body[key];
                }
                res.status(200).json(user);   
            } else {
                res.status(200).json(user);
            }
        }
    }
}

module.exports = new UserController;