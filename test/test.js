const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const should = chai.should()
const expect = chai.expect

chai.use(chaiHttp)

// ---> DEBUT
/**
  * Génération des nouvelles couleurs et enregistrement de ces
  * couleurs dans un tableau.
  */
const newValues = []
const colorKey = 'NEW_COLOR_'
let nextCursor = 0;
const payloadColor = () => {
  const nextColor = `${colorKey}${nextCursor}`
  newValues.push(nextColor)
  nextCursor++;
  return { 'color': nextColor }
}
const getCurrentCulor = () => {
  return nextCursor > 0 ? `${colorKey}${nextCursor - 1}` : `${colorKey}O`
}
// <-- FIN

describe('Color test API', function() {
  beforeEach((done) => {
    indexedDB.remove({}, () => {
      done();
    });
  });
  // 1 
  it('Response should be 200 if color list returned', function(done) {
    chai.request('http://localhost:8080')
    .get('/test')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      res.should.be.json;
      res.should.be.object;
      res.should.be.array;
      done();
    });
  });
  // 2
  it('Response should be 404 if path is invalid', function(done) {
    chai.request(server)
    .get('/index')
    .end(function (err, res) {
      expect(res).to.have.status(404);
      done();
    });
  });
  //3
  it('Response should be 201 if a new color is added', function(done) {
    chai.request(server)
    .send('/index')
    .end(function(err, res) {
      expect(res).to.have.status(201);
      res.should.be.json;
      res.should.be.array;
      done();
    });
  });
  // 4
  it('Response should be 200 if color list is returned with the new ones', function(done) {
    chai.request(server)
    .get('/index')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      res.should.be.json;
      res.should.be.object;
      res.should.be.array;
      done();
  });
});
})