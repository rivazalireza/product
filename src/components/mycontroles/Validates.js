import React from 'react'
import moment from 'jalali-moment'
function isValidNationalCodeEmpty(input){
  if(!input || input==='')return true;
  if (!/^\d{10}$/.test(input))
  return false;

var check = parseInt(input[9]);
var sum = 0;
var i;
for (i = 0; i < 9; ++i) {
  sum += parseInt(input[i]) * (10 - i);
}
sum %= 11;

return (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11);
}
function isValidNationalCode(input) {
    if (!/^\d{10}$/.test(input))
        return false;
  
    var check = parseInt(input[9]);
    var sum = 0;
    var i;
    for (i = 0; i < 9; ++i) {
        sum += parseInt(input[i]) * (10 - i);
    }
    sum %= 11;
  
    return (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11);
  }
  function isValidForceChecked(input) {
    return (input === 'true');
  }
  function isNumber(number){
    if (+number === +number && number!='0') { // if is a number
      return true;
  }

  return false;
  }
  function isValidMobileNumber(input){
    if(input==='')return true;
    if(!input) return false
    if(input.length!==11) return false
    var d0 = parseInt(input[0])
    var d1 = parseInt(input[1])
    if(d0!==0 || d1!==9) return false
    return true
  }
  function isValidMobileNumberٍEmpty(input){
    if(!input || input==='')return true;
    if(input.length!==11) return false
    var d0 = parseInt(input[0])
    var d1 = parseInt(input[1])
    if(d0!==0 || d1!==9) return false
    return true
  }
  function isValidPersianDate(input){
    if(!input)
      return false
      try{
        var m = moment(input);
        if(m.isValid()){
          var dateArray=m.locale('en').format('YYYY/MM/DD').split('/')
          // if(dateArray[0]<='1920' || dateArray[0]>='2022')
          //    return false
          return true
        } else {
          return false;
        }
      }
      catch(e){
        return false;
      }
    return true;
  }
  function isValidPasswordLen(input){
    if(!input)
      return false
    if(input.length<6)
      return false
    return true
  }

  function isValidPostalCode(input){
    if(!input)
      return false
    if(input.length!=10)
      return false
    return true
  }

  export {isValidMobileNumber,isValidMobileNumberٍEmpty,isValidNationalCode,isValidNationalCodeEmpty,isValidForceChecked,isValidPasswordLen,isValidPostalCode,isNumber,isValidPersianDate}