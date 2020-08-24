const {Router, json} = require('express');
const objectId = require('mongodb').ObjectID;
const router = Router();
const User = require('../model/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const JWT_SECRET = process.env.JWT_SECRET;

const isAuthenticated = async (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send(err);
        req.user = user;
        next();
    })
};

// запрос всех пользователей
router.get("/", isAuthenticated, async (req,res) => {
    const users = await User.find();
    res.send(users);
});

// запрос конкретного пользователя
router.get("/:id", isAuthenticated, async (req,res) => {
    const id = new objectId(req.params.id);
    await User.findOne({_id: id}, (err, user) => {
        if (err) return console.log(err);
        res.send(user);
    })
});

// удаление пользователя по id
router.delete("/:id", isAuthenticated, async (req, res) =>{

    const id = new objectId(req.params.id);
    await User.findOneAndDelete({_id: id}, function(err, result){

        if(err) return console.log(err);
        let user = result.value;
        res.send(user);
    });
});

//обновление данных у пользователя
router.put("/user", isAuthenticated, json(), async (req, res) =>{

    if(!req.body) return res.sendStatus(400);
    const id = new objectId(req.body.id);
    const userName = req.body.name;
    const userAge = req.body.age;

    await User.findOneAndUpdate({_id: id}, { $set: {age: userAge, name: userName}},
        {returnOriginal: false },function(err, result){

            if(err) return console.log(err);
            const user = result.value;
            res.send(user);
        });
});
module.exports = router;
