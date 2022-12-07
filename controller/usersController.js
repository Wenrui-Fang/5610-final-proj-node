import mongoose from 'mongoose';
import * as usersDao from '../daos/usersDao.js';

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
    const userIdToUpdate = req.params.tid;
    const updates = req.body;
    const status = await usersDao.updateUser(userIdToUpdate, updates);
    res.json(status); 
}

const deleteUser = async(req, res) => {
    const uid = req.params.uid;
    const status = await usersDao.deleteUser(uid);
    res.json(status);
}

const UsersController =  (app) => {
    app.post('/api/users', createUser);
    app.get('/api/users', findAllUsers);
    app.get('/api/users/:uid',findUserById);
    app.put('/api/users/:uid',updateUser);
    app.delete('/api/users/:uid', deleteUser);
}

export default UsersController;