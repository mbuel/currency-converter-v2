export default function FilterNum(num, priorNum = 1) {
  //  FIXED: got to a state where "prior num is not defined" after typing 144(4) into input
  // FIXED: further testing revealed any number >= 1000 fails this filter
  
  num = num.toString().replace(/\$|,/g, '');
  priorNum = priorNum.toString().replace(/\$|,/g, '');
  
  num = isNaN(num) ? priorNum : num;

  return num;
}