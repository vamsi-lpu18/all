class Person{
    name:string
    age:number
    static city:string="Tanuku";
    constructor(name:string,age:number)
    {
        this.name=name;
        this.age=age;
    }
}

var object=new Person('vamsi',40);
console.log(object.name+" "+ object.age);
console.log(Person.city);
