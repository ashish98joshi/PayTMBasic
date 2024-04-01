const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const mongoose = require('mongoose');
const router = express.Router()


router.get('/balance', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const account = await Account.findOne({userId: userId});
    if (!account) {
        return res.status(411).json({
            msg: 'User not found'
        })
    }

    res.status(200).json({
        balance: account.balance
    })
})

router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    // everything between this and commit transaction is either all or none i.e either dml woudl happen for all or for none of them
    session.startTransaction();
    const {to, amount} = req.body;

    const fromAccount = await Account.findOne({userId: req.userId}).session(session);
    if (!fromAccount || fromAccount.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            msg: 'Account doesn\'t exist or you have insufficient balance!'
        })
    }

    const toAccount = await Account.findOne({userId: to}).session(session);
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            msg: 'Account doesn\'t exist!'
        })
    }    

    // performing DML 
    await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session);
    await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session);

    await session.commitTransaction();
    res.status(200).json({
        msg: 'Transfer successful'
    })
})


module.exports = router;


