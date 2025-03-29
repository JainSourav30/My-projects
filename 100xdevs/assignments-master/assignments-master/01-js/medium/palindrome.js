/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  /*let newStr = str.replace(/[^a-z0-9]/g,'').toLowerCase();
  if(newStr.length == 1){
    return true;
  }
  let i = 0;
  let j = newStr.length-1;

  while(i<j){
    if(newStr[i] != newStr[j]){
      return false;
    }
    i++;
    j--;
  }
  return true;*/

  const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Reverse the string and compare
    return cleanedStr === cleanedStr.split('').reverse().join('');
}



module.exports = isPalindrome;
