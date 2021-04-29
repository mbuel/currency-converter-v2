/**
 * 
 * @param {string} num input from number display
 * @param {string} priorNum state value in case there is an invalid entry (overwrites output)
 * @returns 
 */
export default function FilterNum(num, priorNum = 1) {
  //  FIXED: got to a state where "prior num is not defined" after typing 144(4) into input
  //  FIXED: further testing revealed any number >= 1000 fails this filter
  console.log(num, priorNum);
  if (!num) {
    return '0';
  }
  num = num.match(/\ ?[+-]?[0-9]{1,3}(?:,?[0-9])*(?:\.[0-9]{1,2})?/);
  // num = num.toString().replace(/\$|,/g, '');
  priorNum = priorNum.toString().match(/\ ?[+-]?[0-9]{1,3}(?:,?[0-9])*(?:\.[0-9]{1,2})?/);
  
  num = isNaN(num) ? priorNum : num;
  console.log(num);
  return num.length >= 0 ? num[0] : 0;
}