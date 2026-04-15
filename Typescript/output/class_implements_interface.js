"use strict";
class Interface {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
        // .console.log();
        console.log('his name is ' + name + ' he failed at ' + age);
    }
    setInfo(name) {
        this.name = name;
        console.log('her name is ' + name);
    }
    getInfo() {
        return ['vamsi', 'amin', 'satya'];
    }
}
var fail = new Interface('vamsi', 20);
fail.setInfo('yasaswi');
var val = fail.getInfo().map((ele) => {
    return ele;
});
console.log(val);
