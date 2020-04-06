function palindrome(str) {
    // Good luck!
    str = str.toLowerCase().replace(/[_#$,:|-\s.()]/g, "");
    let start = 0;
    let end = str.length-1;
  
    console.log(str);
  
    while(start <= end){
      if(str.charAt(start) !== str.charAt(end)){
        return false;
      }
      start++;
      end--;
    }
    return true;
  }
  
  
  
  palindrome("eye");