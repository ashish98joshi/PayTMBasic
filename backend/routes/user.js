const express = require('express')
const router = express.Router();
const { signupType, signInType, updateBody } = require('../types');
const { User } = require('../db')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middleware');


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

router.post('/signup', async (req, res) => {
    const zodResult = signupType.safeParse(req.body);
    
    if (!zodResult.success) {
        return res.status(401).json({
            msg: 'Incorrect input'
        })
    }
    
    if (await checkIfUserAlreadyExists(body, 'signup')) {
        return res.status(411).json({
            msg: 'User already exists'
        })
    }

    const user = await User.create(req.body)
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

router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || '';

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            },
            lastName: {
                "$regex": filter
            }
        }]
    })

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