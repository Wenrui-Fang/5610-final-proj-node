import * as usersDao from '../daos/usersDao.js';
import * as followService from '../service/followService.js';

const createUser = async(req, res) => {
    const newUser = req.body;
    const insertedUser = await usersDao.createUser(newUser);
    res.json(insertedUser);
}

const findAllUsers = async(req, res) => {
    const users = await usersDao.findAllUsers();
    res.json(users);
}

const findUserById = async(req, res) => {
    const uid = req.params.uid;
    const user = await usersDao.findUserById(uid);
    res.json(user);
}

const updateUser =  async(req, res) => {
    let newUser = req.body;
    let password = null;
    if(newUser.password!==""){
        const passwd = newUser.password;
        password = await bcrypt.hash(passwd,saltRounds);
    }else{
        const user = await usersDao.findUserById(newUser._id);
        password = user.password;
    }


    newUser = {...newUser,password: password};


    let update = await usersDao.updateUser(newUser._id,newUser);
    let updatedUser = await usersDao.findUserById(newUser._id);
    // @ts-ignore
    req.session[`profile`] = updatedUser;
    // @ts-ignore
    res.json(updatedUser);
}

const deleteUser = async(req, res) => {
    const uid = req.params.uid;
    const status = await usersDao.deleteUser(uid);
    res.json(status);
}

const findUserByUsername = async(req, res) => {
    let username = req.session['profile'] && req.params.username === req.session['profile'].username ? 
        req.session['profile'].username : req.params.username;

    let flag = true;
    if (req.params.username === req.session['profile'].username && req.session['profile']) {
        flag = false;
    }

    let uid1 = req.session['profile']._id;

    const user = await usersDao.findUserByUsername(username);

    if (flag) {
        const newUser = await followService
            .getSingleFollowedUser(uid1,user);

        res.json(newUser);
    } else {
        res.json(user);
    }
}

const UsersController =  (app) => {
    app.post('/api/users', createUser);
    app.get('/api/users', findAllUsers);
    app.get('/api/users/:uid',findUserById);
    app.get('/api/users/username/:username', findUserByUsername);
    app.put('/api/users/:uid',updateUser);
    app.delete('/api/users/:uid', deleteUser);
}

export default UsersController;