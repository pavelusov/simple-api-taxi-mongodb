const express = require('express');
const router = express.Router();

// db
const Driver = require('../../database/models/Driver');

router.get('/', (req, res) => {
  res.send({ hi: 'there' })
});

// Create driver
router.post('/drivers', (req, res, next) => {
  const { body: driverProp = {} } = req;

  Driver.create(driverProp)
    .then(driver => {
      res.send(driver);
    })
    .catch(next);
});

router.put('/drivers/:id', (req, res, next) => {
  const {
    body: driverProps = {},
    params: { id: driverId = '' }
  } = req;

  Driver
    .findByIdAndUpdate(driverId, driverProps)
    .then(() => Driver.findById(driverId))
    .then(driver => res.send(driver))
    .catch(next);
});

module.exports = router;

