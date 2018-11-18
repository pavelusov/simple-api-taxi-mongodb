const drivers = require('./drivers');

const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
  res.send('<h1>Home page</h1>');
});

router.get('/api', drivers.api);

module.exports = router;

