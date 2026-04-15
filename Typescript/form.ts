function greet()
{
    const name=document.getElementById('name') as HTMLInputElement
    console.log(name.value);
    const age=document.getElementById('age') as HTMLInputElement
    console.log(age.value);
    const email=document.getElementById('email') as HTMLInputElement
    console.log(email.value)
}