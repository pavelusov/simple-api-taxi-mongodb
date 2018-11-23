const mongoose = require('mongoose');
const { NODE_ENV = '' } = process.env;

before(done => {
  if (NODE_ENV === 'test') {
    mongoose.connect('mongodb://localhost/test_taxi');
    mongoose.connection
      .once('open', () => done())
      .on('error', err => {
        console.warn('warn ', err);
      });

  }
});

beforeEach(done => {
  const {drivers} = mongoose.connection.collections;
  drivers
    .drop()
    .then(() => done())
    .catch(() => done())
});


