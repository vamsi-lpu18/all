"use strict";
var Practise1;
(function (Practise1) {
    class home {
        greet() {
            console.log("how are you");
        }
    }
    Practise1.home = home;
    function reply() {
        console.log("im fine thankyou how are you");
    }
    Practise1.reply = reply;
})(Practise1 || (Practise1 = {}));
var test = new Practise1.home;
test.greet();
// test.reply();
// practise.greet();
Practise1.reply();
