'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    let {input} = req.query
    
    let initNum = convertHandler.getNum(input)
    let initUnit = convertHandler.getUnit(input)
    let returnNum = convertHandler.convert(initNum, initUnit)
    let returnUnit = convertHandler.getReturnUnit(initUnit)
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)

    if(initUnit === 'invalid unit' && initNum === 'invalid number') return res.status(200).send('invalid number and unit')
    if(initUnit === 'invalid unit') return res.status(200).send(initUnit)
    if(initNum === 'invalid number') return res.status(200).send(initNum)
      
    res.status(200).json(
      {
        initNum, 
        initUnit, 
        returnNum, 
        returnUnit, 
        string
      }
    )
  })
};

/*
Example usage
/api/convert?input=4gal
/api/convert?input=1/2km
/api/convert?input=5.4/3lbs
/api/convert?input=kg
Example return
{ 
  initNum: 3.1, 
  initUnit: 'mi', 
  returnNum: 4.98895, 
  returnUnit: 'km', 
  string: '3.1 miles converts to 4.98895 kilometers' 
}
*/