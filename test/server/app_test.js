const assert = require('assert');
const request = require('supertest');
const app = require('../../server/app');

describe('Запуск приложения', () => {
  it('/app', done => {
    request(app)
      .get('/api')
      .end((err, response) => {
        console.log('response', response.body)
        assert(response.body.hi === 'there');
        done();
      })
  })
});
