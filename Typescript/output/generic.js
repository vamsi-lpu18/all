"use strict";
function add(data) {
    if (typeof data == 'number')
        return data;
    else
        return ("not a number");
}
console.log(add(3));
