const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.send('hello there');
});

router.post('/signup', (req, res) => {

})

module.exports = router