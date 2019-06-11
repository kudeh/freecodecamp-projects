/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {
    
    var result = null;
    var splitIndex = input.search(/[A-Za-z]+/);
    var num = input;

    if(!(splitIndex === -1)){
      num = input.slice(0, splitIndex);
    }
    
    if(splitIndex === 0){
       return 1;
    }
    
    if(num.includes("/")){
      var numArr = num.split("/");
      if(numArr.length === 2){
        var numer = parseFloat(numArr[0]);
        var denom = parseFloat(numArr[1]);

        if(!isNaN(numer) && !isNaN(denom)){
          return numer/denom;
        }
      }
    }
    
    if(!isNaN(num)){
      if(parseFloat(num) >= 0){
        result = parseFloat(num);

      }
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    var result = null;
    var possibleUnits = ['gal', 'lbs', 'mi', 'kg', 'l', 'km'];
    var splitIndex = input.search(/[A-Za-z]+/);
    var unit = input.slice(splitIndex)
    
    if(unit){
      unit = unit.toLowerCase();
    }
    
    if(possibleUnits.includes(unit)){
      result = unit;
    }
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {

    if(!initUnit){
      return null;
    }

    var unit = initUnit.toLowerCase();

    const mapping = {
      lbs: 'kg',
      gal: 'l',
      mi: 'km',
      kg: 'lbs',
      l: 'gal',
      km: 'mi'
    }
    
    var result = null;
    if(mapping[unit]){
      result = mapping[unit];
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {

    if(!unit){
      return null;
    }
    
    var unit = unit.toLowerCase();

    const mapping = {
      lbs: 'pounds',
      gal: 'gallons',
      mi: 'miles',
      kg: 'kilograms',
      l: 'liters',
      km: 'kilometers'
    }
    
    var result = mapping[unit];
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {

    if(!initNum || !initUnit){
      return null;
    }
    
    var unit = initUnit.toLowerCase();
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    const mapping = {
      lbs: lbsToKg,
      gal: galToL,
      mi: miToKm,
      kg: 1/lbsToKg,
      l: 1/galToL,
      km: 1/miToKm
    }
    
    var result = null;
    
    if(mapping[unit]){
      result = initNum * mapping[unit];
    }
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result= initNum + " " + this.spellOutUnit(initUnit) + 
                " converts to " + returnNum + " " + this.spellOutUnit(returnUnit);
    
    return result;
  };
  
}

module.exports = ConvertHandler;