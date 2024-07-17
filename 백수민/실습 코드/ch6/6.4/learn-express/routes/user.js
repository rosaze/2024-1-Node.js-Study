 const express = require('express');

 const router = express.Router();

 // GET / 라우터

router.get('/', (req, res) => { // GET /user/
    res.send('Hello, user');
});

module.exports = router;