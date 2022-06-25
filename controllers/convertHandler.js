let unitRegExp = /gal\b|l\b|mi\b|km\b|lbs\b|kg\b/i

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;

    result = input.replace(/[a-z]+/gi, '');
    if(!result) return 1
    if(result.match(/\//g)?.length > 1) return 'invalid number'
    if(/\//g.test(result)) result = result.split('/')[0] / result.split('/')[1]
    
    return parseFloat(result);
  };
  
  this.getUnit = function(input) {
    let result;
    
    if(!unitRegExp.test(input)) return 'invalid unit'
    result = input.match(/[a-z]+/gi)[0];
    if(result === 'l' || result === 'L') return 'L'
    
    return result.toLowerCase();
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    switch(initUnit) {
      case "gal":
          result = 'L'
          break;
      case "L":
      case "l":
          result = 'gal'
          break;
      case "lbs":
          result = 'kg'
          break;
      case "kg":
          result = 'lbs'
          break;
      case "mi":
          result = 'km' 
          break;
      case "km":
          result = 'mi'
          break;
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    if(!unitRegExp.test(unit)){
      return 'invalid unit'
    }
    
    result = unit.match(/[a-z]/gi)
    
    return result.join();
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch(initUnit) {
      case "GAL":
      case "gal":
          result = initNum * galToL 
          break;
      case ("L"):
      case ("l"):
          result = initNum / galToL 
          break;
      case "LBS":
      case "lbs":
          result = initNum * lbsToKg 
          break;
      case "KG":
      case "kg":
          result = initNum / lbsToKg
          break;
      case "MI":
      case "mi":
          result = initNum * miToKm 
          break;
      case "KM":
      case "km":
          result = initNum / miToKm
          break;
      default:
        return
    }
    
    return parseFloat(result.toFixed(5))
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;

    switch(initUnit) {
      case "L":
      case "l":
        initUnit = 'liters';
        returnUnit = 'gallons';
        break;
      case "GAL":
      case "gal":
        initUnit = 'gallons';
        returnUnit = 'liters';
        break;
      case "KG":
      case "kg":
        initUnit = 'kilograms';
        returnUnit = 'pounds';
        break;
      case "LBS":
      case "lbs":
        initUnit = 'pounds';
        returnUnit = 'kilograms';
        break;
      case "KM":
      case "km":
        initUnit = 'kilometers';
        returnUnit = 'miles';
        break;
      case "MI":
      case "mi":
        initUnit = 'miles';
        returnUnit = 'kilometers';
        break;
    }
      
    result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
