function add<T>(data:T):T{
    if(typeof data=='number')
    return data;
else return ("not a number") as T;
}

console.log(add(3));
