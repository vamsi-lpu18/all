function classname(constructor:Function) {
    console.log(constructor.name);  
}

function keyname(val:any,keys:any)
{
    console.log(keys);
    
}
@classname
class decor{
    @keyname
   private val1:number
    val2:number
    constructor(val1:number,val2:number)
    {
        this.val1=val1;
        this.val2=val2;
    }
}
var test1=new decor(1,1);