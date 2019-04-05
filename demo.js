'use strict';

let window = {};
const str = `window.returnCitySN = {"cip": "218.83.19.46", "cid": "310000", "cname": "上海市"};`;

const res = eval(str);

console.log(window);

// str.replace(/\{(.+?)\}/g, (target, match) => {
//   const result = `{${match}}`;
//   const obj = JSON.parse(result);
//   console.log(obj.cname);
// });

