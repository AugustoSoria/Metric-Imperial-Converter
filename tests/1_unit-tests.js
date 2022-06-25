const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();
let units = ['gal','l','mi','km','lbs','kg']
let eqUnits = ['L','gal','km','mi','kg','lbs']
let unitRegExp = new RegExp('gal|l|mi|km|lbs|kg', 'i')

suite('Unit Tests', function(){
  test('#whole number input', function (done) {
    assert.isNumber(convertHandler.getNum('32g'), '32g is not a valid number');
    done()
  });
  test('#decimal number input', function (done) {
    assert.equal(convertHandler.getNum('1.2mi'), 1.2, '1.2mi is not a valid decimal number');
    done()
  });
  test('#fractional input', function (done) {
    assert.equal(convertHandler.getNum('1/2km'), 0.5, '1/2km is not a valid fractional number');
    done()
  });
  test('#fractional input with a decimal', function (done) {
    assert.equal(convertHandler.getNum('5.4/3lbs'), 1.8, '5.4/3lbs is not a valid fractional input with a decimal.');
    done()
  });
  test('#double-fraction', function (done) {
    assert.equal(convertHandler.getNum('3/7.2/4kg'), 'invalid number', '3/7.2/4kg is not a valid fractional input with a decimal.');   
    done()
  });
  test('#no numerical input is provided', function (done) {
    assert.equal(convertHandler.getNum('kg'), 1, '3/7.2/4kg is not a valid fractional input with a decimal.');   
    done()
  });   
  test('#valid input unit', function (done) {
    units.map(u => {
      assert.match(convertHandler.getUnit('3' + u), unitRegExp, 'unit valid')
    })
    done()
  });
  test('#invalid input unit', function (done) {
    assert.equal(convertHandler.getUnit('3kmm'), 'invalid unit', 'unit invalid')
    done()
  });
  test('#correct return unit for each valid input unit', function (done) {
    units.map((u,i) => {
      assert.equal(convertHandler.getReturnUnit(u), eqUnits[i], 'eqUnit valid')
    })
    done()
  });
  test('#the spelled-out string unit for each valid input unit', function (done) {
    assert.equal(convertHandler.spellOutUnit('gal'), 'g,a,l', 'spelled-out string unit')
    assert.equal(convertHandler.spellOutUnit('l'), 'l', 'spelled-out string unit')
    assert.equal(convertHandler.spellOutUnit('mi'), 'm,i', 'spelled-out string unit')
    assert.equal(convertHandler.spellOutUnit('km'), 'k,m', 'spelled-out string unit')
    assert.equal(convertHandler.spellOutUnit('lbs'), 'l,b,s', 'spelled-out string unit')
    assert.equal(convertHandler.spellOutUnit('kg'), 'k,g', 'spelled-out string unit')
    done()
  });
  test('#gal to L', function (done) {
    assert.approximately(convertHandler.convert(3, 'gal'), 3 * 3.78541, 0.001, 'convert')
    done()
  });
  test('#L to gal', function (done) {
    assert.approximately(convertHandler.convert(3, 'l'), 3 / 3.78541, 0.001, 'convert')
    done()
  });
  test('#mi to km)', function (done) {
    assert.approximately(convertHandler.convert(3, 'mi'), 3 * 1.60934, 0.001, 'convert')
    done()
  });
  test('#km to mi', function (done) {
    assert.approximately(convertHandler.convert(3, 'km'), 3 / 1.60934, 0.001, 'convert')
    done()
  });
  test('#lbs to kg', function (done) {
    assert.approximately(convertHandler.convert(3, 'lbs'), 3 * 0.453592, 0.001, 'convert')
    done()
  });
  test('#kg to lbs', function (done) {
    assert.approximately(convertHandler.convert(3, 'kg'), 3 / 0.453592, 0.001, 'convert')
    done()
  });  
});