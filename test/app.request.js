var request = require('supertest'),
  app = require('../app.js');

describe('GET app', function () {
  it('responds with html', function (done) {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

  it('responds with javascript', function (done) {
    request(app)
      .get('/scripts/index.js')
      .expect('Content-Type', /javascript/)
      .expect(200, done);
  });

  it('responds with json', function (done) {
    request(app)
      .get('/')
      .set('X-Requested-With', 'XMLHttpRequest')
      .set('x-vanillaAjaxWithoutjQuery-version', '1.0')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
