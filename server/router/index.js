const express = require('express');
const router = express.Router();

const drivers = require('./drivers');

router.get('/', (req,res)=>{
  res.send('<h1>Home page</h1>');
});

router.use('/api', drivers);

module.exports = router;

