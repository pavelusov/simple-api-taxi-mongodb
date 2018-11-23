const express = require('express');
const router = express.Router();

// db
const Driver = require('../../database/models/Driver');

router.get('/', (req, res) => {
  res.send({ hi: 'there' })
});

router.get('/drivers', (req, res, next) => {
  const { lng = 0, lat = 0 } = req.query;

  Driver.geoNear(
    { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
    { spherical: true, maxDistance: 200000 } // Unit: meter
  )
    .then(drivers => res.send(drivers))
    .catch(next);

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

// Update driver
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

// Remove driver
router.delete('/drivers/:id', (req, res, next) => {
  const {
    params: { id: driverId = '' }
  } = req;
  Driver
    .findByIdAndRemove(driverId)
    .then(driver => res.status(204).send(driver))
    .catch(next);
});

module.exports = router;

