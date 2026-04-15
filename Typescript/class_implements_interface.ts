interface class_implemnts{
    name:string,
    age:number,
    setInfo(name:string):void,
    getInfo():string[];
}
class Interface implements class_implemnts{
    name:string
    age:number
    constructor(name:string,age:number){
        this.name=name;
        this.age=age;
        // .console.log();
        console.log('his name is '+name+' he failed at '+age); 
    }
    setInfo(name:string):void{
        this.name=name;
       console.log('her name is '+name);
    }
    getInfo(): string[] {
        return ['vamsi','amin','satya'];
    }
}

var fail=new Interface('vamsi',20);
fail.setInfo('yasaswi');
var val:string[]=fail.getInfo().map((ele)=>{
    return ele;
});
console.log(val);
