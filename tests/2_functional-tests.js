const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let response10L = { 
    initNum: 10, 
    initUnit: 'L', 
    returnNum: 2.64172, 
    returnUnit: 'gal', 
    string: '10 liters converts to 2.64172 gallons', 
}

let responseKg = {
    initNum: 1,
    initUnit: 'kg',
    returnNum: 2.20462,
    returnUnit: 'lbs',
    string: '1 kilograms converts to 2.20462 pounds'
}

suite('Functional Tests', function() {
    suite('GET /api/convert', function () {
        test('?input=10L', function (done) {
            chai
            .request(server)
            .get('/api/convert?input=10L')
            .end(function (err, res) {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.include(res.body, response10L, 'Response body should be like response10L object');
                done();
            });
        });
    });
    suite('GET /api/convert', function () {
        test('?input=32g', function (done) {
            chai
            .request(server)
            .get('/api/convert?input=32g')
            .end(function (err, res) {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.equal(res.text, 'invalid unit', 'Response text should be invalid unit');
                done();
            });
        });
    });
    suite('GET /api/convert', function () {
        test('?input=3/7.2/4kg', function (done) {
            chai
            .request(server)
            .get('/api/convert?input=3/7.2/4kg')
            .end(function (err, res) {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.equal(res.text, 'invalid number', 'Response text should be invalid number');
                done();
            });
        });
    });    
    suite('GET /api/convert', function () {
        test('?input=3/7.2/4kilomegagram', function (done) {
            chai
            .request(server)
            .get('/api/convert?input=3/7.2/4kilomegagram')
            .end(function (err, res) {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.equal(res.text, "invalid number and unit", 'Response text should be invalid number and unit');
                done();
            });
        });
    });
    suite('GET /api/convert', function () {
        test('?input=kg', function (done) {
            chai
            .request(server)
            .get('/api/convert?input=kg')
            .end(function (err, res) {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.include(res.body, responseKg, 'Response body should be be like responseKg object');
                done();
            });
        });
    });
});