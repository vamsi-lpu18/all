 namespace Practise1{
    export class home{
        greet(){
            console.log("how are you");
        }
    }
    export function reply(){
        console.log("im fine thankyou how are you");
    }
}
var test=new Practise1.home;
test.greet();
// test.reply();
// practise.greet();
Practise1.reply();