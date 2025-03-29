/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/
function normalise(str){
  str.replace(/\s/g, ' ').toLowerCase().split('').sort().join('');
}

function isAnagram(str1, str2) {
  if(str1.length !== str2.length){
    return false;
  }
  return normalise(str1)=== normalise(str2);
}

console.log(isAnagram("hello","World"));

module.exports = isAnagram;
