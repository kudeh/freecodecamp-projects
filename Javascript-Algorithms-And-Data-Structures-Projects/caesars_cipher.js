function rot13(str) { // LBH QVQ VG!
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let decode = '';
  
    for(let i = 0; i < str.length; i++){
        let letter = str.charAt(i);
  
         if(str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90){
            if((alphabet.indexOf(letter) - 13) < 0){
                decode += alphabet.charAt((alphabet.indexOf(letter)-13+26 ));
            }else {
                decode += alphabet.charAt(alphabet.indexOf(letter) - 13);
            }
        }else {
            decode += letter;
        }
  
    }
  
    console.log(decode);
    return decode;
  }
  
  // Change the inputs below to test
  rot13("SERR PBQR PNZC");