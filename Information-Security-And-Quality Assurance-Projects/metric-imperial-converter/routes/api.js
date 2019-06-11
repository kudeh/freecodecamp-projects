/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input;
      var initNum = convertHandler.getNum(input);
      if(initNum){
        initNum = initNum.toFixed(5);
      }
      var initUnit = convertHandler.getUnit(input);

      var returnNum = convertHandler.convert(initNum, initUnit)
      if(returnNum){
        returnNum = returnNum.toFixed(5);
      }
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      if(!(initNum) && !(initUnit)){
        toString = "invalid number and unit";
      }else if(!initNum){
        toString = "invalid number";
      }else if(!initUnit){
        toString = "invalid unit";
      }
      
      res.json({initNum: initNum, initUnit: initUnit, returnNum: returnNum, returnUnit: returnUnit, string: toString});
    });
    
};
