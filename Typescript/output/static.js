"use strict";
class Person {
    name;
    age;
    static city = "Tanuku";
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
var object = new Person('vamsi', 40);
console.log(object.name + " " + object.age);
console.log(Person.city);
