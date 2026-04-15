class Practise{
    name:string
    age:number
    city:string
    cart:boolean
    buy:boolean
    constructor(name:string,age:number,city:string){
        this.name=name
        this.age=age
        this.city=city
        this.cart=false
        this.buy=false
    }
    add(){
        this.cart=true;
    }
    canbuy(){
        if(this.cart)
            return "item bought"
        else return "item not found"
    }
}

var pract=new Practise('vamsi',10,'tanuku')
// pract.add();
console.log(pract.canbuy())