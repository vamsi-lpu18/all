"use strict";
var names;
(function (names) {
    names["first"] = "first";
    names["second"] = "second";
    names["third"] = "third";
    names["fourth"] = "fourth";
})(names || (names = {}));
var naming = names.first;
naming = names.second;
naming = names.fourth;
// console.log(naming)
var fruits;
(function (fruits) {
    fruits[fruits["apple"] = 0] = "apple";
    fruits[fruits["banana"] = 1] = "banana";
    fruits[fruits["mango"] = 2] = "mango";
    fruits[fruits["grapes"] = 3] = "grapes";
})(fruits || (fruits = {}));
var fruit = fruits.grapes;
console.log(fruit);
