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
          .findOne({ email: options.email })
          .then(driver => {
            assert(driver === null);
            done();
          })
      });
  });

  it('GET запрос /api/drivers/id. Ищем водителя вокруг себя. Model.geoNear.', done => {
    const firstDriver = new Driver({
      email: 'first@test.com',
      geometry: {
        type: 'Point',
        coordinates: [-122.47, 47.614]
      }
    });
    const secondDriver = new Driver({
      email: 'first@test.com',
      geometry: {
        type: 'Point',
        coordinates: [-80.253, 25.791]
      }
    });

    Promise.all([
      firstDriver.save(),
      secondDriver.save()
    ]).then(() => {
      request(app)
        .get('/api/drivers?lng=-80&lat=25')
        .end((err, response) => {
          assert(response.body.length === 1);
          assert(response.body[0].obj.email === 'first@test.com');
          done();
        });
    })

  })

});

