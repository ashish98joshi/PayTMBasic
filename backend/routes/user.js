const express = require('express')
const router = express.Router();
const { signupType, signInType, updateBody } = require('../types');
const { User, Account } = require('../db')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middleware');
const { Mongoose } = require('mongoose');

// method to check if user already exists
async function checkIfUserAlreadyExists(body, routerType) {
    if (routerType == 'signup') {
        return await User.findOne({
            userName: body.userName
        })
    } else  if (routerType == 'signin'){
        return await User.findOne({
            userName: body.userName,
            password: body.password
        })
    }
}

router.get('/getUsers', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const users = await User.find({_id: { $ne: userId }});
    if (users) {
        res.status(200).json({
            users: users
        })
    }
})

router.post('/signup', async (req, res) => {
    const zodResult = signupType.safeParse(req.body);
    console.log(req.body);
    if (!zodResult.success) {
        return res.status(401).json({
            msg: 'Incorrect input'
        })
    }
    
    if (await checkIfUserAlreadyExists(req.body, 'signup')) {
        return res.status(411).json({
            msg: 'User already exists'
        })
    }

    const user = await User.create(req.body);

    if (user) {
        await Account.create({
            userId: user._id,
            balance: 1 + Math.random() * 10000
        })
    }
    const token = jwt.sign({userId: user._id}, JWT_SECRET);
    res.json({
        msg: 'User successfully created!',
        token: token
    })
})


router.post('/signin', async (req, res) => {
    const body = req.body;
    const zodResult = signInType.safeParse(body);
    if (!zodResult.success) {
        res.status(403).json({
            msg: 'Invalid inputs'
        })
    }
    const user = await checkIfUserAlreadyExists(body, 'signin')
    if (user) {
        const token = jwt.sign({userId: user._id}, JWT_SECRET)
        return res.json({
            token: token
        })
    } 

    res.status(411).json({
        msg: 'Error while logging in'
    })
})


router.put('/', authMiddleware, async (req, res) => {
    const body = req.body;
    const zodResult = updateBody.safeParse(body);
    if (!zodResult.success) {
        res.status(403).json({
            msg: 'Invalid Input'
        })
    }
    try {
        const user = await User.findOneAndUpdate({_id: req.userId}, body)
        res.json({
            msg: 'Updated Successfully'
        })
    } catch (error) {
        res.status(411).json({
            msg: 'Error while updating'
        })
    }

})

router.get('/bulk', authMiddleware, async (req, res) => {
    const filter = req.query.filter || '';
    console.log(filter)
    const users = await User.find({
        $and: [{
            $or: [
                { firstName: { "$regex": filter } },
                { lastName: { "$regex": filter } }
            ]},
            { _id: { $ne: req.userId } }
        ]
    })
    console.log(users)
    if (users) {
        res.json({
            user: users.map((user) => ({
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })
    } else {
        res.json('No such record found')
    }
})

module.exports = router