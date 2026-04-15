interface utility{
    name:string
    roll:number
    age:number
}
//partial 
var stu:Partial<utility>={
    name:'vamsi',
    age:40,
    roll:30,
    
    // city:'velpur'
}
// Required

var teach:Required<utility>={
    name:'vamsi',
    age:39,
    roll:44,
    // city:'dsdsad'
}

