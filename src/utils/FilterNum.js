export default function FilterNum(num, priorNum) {
  
  num = typeof num === 'string' && num.indexOf('$') >= 0 ? num.split('$')[1] : num;
  console.warn(num, typeof num);
  num = isNaN(num) ? priorNum.split('$')[1] : num;
  console.warn(num, typeof num);
  console.warn(num);

  return num;
}