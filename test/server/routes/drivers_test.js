const assert = require('assert');
const request = require('supertest');
const app = require('../../../server/app');

const mongoose = require('mongoose');
const Driver = mongoose.model('driver');

describe('Маршрут Drivers. ', () => {
  it('POST запрос /api/drivers. Создаем водителя в базе.', done => {
    request(app)
      .post('/api/drivers')
      .send({ email: 'test@test.mail' })
      .end((err, res) => {
        const { body: { email = '' } } = res;
        assert(email === 'test@test.mail');
        done();
      })
  });

  it('PUT запрос /api/drivers/id. Обновляем инфо о водителе.', done => {
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
  });

  it('DELETE запрос /api/drivers/id. Удаляем водителя', done => {
    const options = {
      email: 'test@test.com'
    };
    const driver = new Driver(options);

    request(app)
      .delete(`/api/drivers/${driver._id}`)
      .end(() => {
        Driver
          .findOne({email:options.email})
          .then(driver => {
            assert(driver === null);
            done();
          })
      });
  })
});

