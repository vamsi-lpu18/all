"use strict";
class Practise {
    name;
    age;
    city;
    cart;
    buy;
    constructor(name, age, city) {
        this.name = name;
        this.age = age;
        this.city = city;
        this.cart = false;
        this.buy = false;
    }
    add() {
        this.cart = true;
    }
    canbuy() {
        if (this.cart)
            return "item bought";
        else
            return "item not found";
    }
}
var pract = new Practise('vamsi', 10, 'tanuku');
// pract.add();
console.log(pract.canbuy());
