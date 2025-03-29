"use strict";
function sumofage(u1, u2) {
    return u1.age + u2.age;
}
const ans = sumofage({ name: 'Sj', age: 20 }, { name: 'Nj', age: 21 });
console.log(ans);
