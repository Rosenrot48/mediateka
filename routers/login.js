const {Router, json} = require('express');
const router = Router();
const User = require('../model/user');
const {SUCCESS_AUTH} = require('../authorization/auth-statuses')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const {auth} = require('../authorization/ldap-client');

require('dotenv').config();

const JWT_TOKEN=process.env.JWT_SECRET;

// router.post('/register', json(), async (req,res) => {
//     try {
//         console.log(req.body);
//         const {email, password, name, surname, telephone, Date} = req.body;
//         const candidate = await User.findOne({ email });
//         if (candidate) {
//             return res.status(400).json({message: 'Такой пользователь уже существует'});
//         }
//         const hashedPassword = await bcrypt.hash(password, 12);
//         const user = new User({email, name, surname, telephone, Date, password: hashedPassword});
//         console.log(user);
//         user.save();
//         const token = jwt.sign(
//             {userId: user.id},
//             JWT_TOKEN,
//             {expiresIn: '1h'}
//         );
//         res.status(201).json({message: 'Пользователь создан', token, userID: user.id});
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
//     }
// });


router.post('/login', json(), async(req,res) => {
    console.log('try to login')
    const {login, password} = req.body;
    // const token = jwt.sign(
    //     {
    //         user:
    //             {
    //                 fullName: 'Andrey Bobrov',
    //                 displayName: login,
    //                 title: 'Software Developer',
    //                 department: 'Software Development',
    //                 company: 'Reunico LLC',
    //                 mail: 'abobrov48@inbox.ru',
    //                 memberOf: ['Camunda_admin', 'Camunda_user', 'All_user']
    //             }
    //     },
    //     JWT_TOKEN
    // )
    // res.send({token});

    auth(login.toLowerCase(), password, (err, result) => {
        if (err) return res.send(err);
        const user =
            {
                fullName: result.cn,
                displayName: result.displayName,
                title: result.title,
                department: result.departmentNumber,
                company: result.company,
                mail: result.mail,
                memberOf: [...result.memberOf.map(value => value.slice(3,value.indexOf(',')))]
            }
        const token = jwt.sign(
            {
                user
                },
            JWT_TOKEN,
        );
        res.cookie('jwt_token', token);
        res.send({status: SUCCESS_AUTH, token, user});
    });
})

module.exports = router;
//            {expiresIn: '30s'}
