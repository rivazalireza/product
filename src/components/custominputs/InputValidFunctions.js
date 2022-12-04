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
  function isValidMobileNumber(input){
    if(!input)
      return false
    if(input.length!==11)
      return false
    var d0 = parseInt(input[0])
    var d1 = parseInt(input[1])
    if(d0!==0 || d1!==9) return false
    return true
  }

  export {isValidMobileNumber,isValidNationalCode,isValidForceChecked}