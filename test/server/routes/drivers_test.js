const assert = require('assert');
const request = require('supertest');
const app = require('../../../server/app');

const mongoose = require('mongoose');
const Driver = mongoose.model('driver');

describe('Driver route', () => {
  it('POST запрос /api/drivers создает водителя в базе', done => {
    request(app)
      .post('/api/drivers')
      .send({ email: 'test@test.mail' })
      .end((err, res) => {
        const { body: { email = '' } } = res;
        assert(email === 'test@test.mail');
        done();
      })
  });

  it('PUT запрос /api/drivers/id обновляем инфо о водителе', done => {
    const options = {
      email: 'test@test.com',
      driving: false
    };
    const driver = new Driver(options);
    driver
      .save()
      .then(() => {
        request(app)
          .put(`/api/drivers/${driver._id}`)
          .send({ driving: true })
          .end(() => {
            Driver
              .findOne({ email: 'test@test.com' })
              .then(driver => {
                assert(driver.driving === true);
                done();
              })
          })
      })

  })
});
