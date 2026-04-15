// import {useForm} from "reatc"
import {useForm} from "react-hook-form" 
const Forms =() =>{
const {
    register,handleSubmit,formState:{errors}
}=useForm();
        const onSubmit =(d)=>console.log("submitted data is ",d)
return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} >
    <label>Enter First name:</label>
    <br></br>
    {/* <input id="fname" type="text" {...register("Firstname",{required:alert("First name is required")})}/> */}
    {/* <input id="fname" type="text" {...register("Firstname", { required: "First name is required" })} />
{errors.Firstname && <p>{errors.Firstname.message}</p>} */}
    <input
  id="fname"
  type="text"
    {...register("Firstname", { required: true,minLength:{value:3,message:"min length should be 3"},maxLength:{value:6,message:"max length should be 6"} })}/>
    {errors.Firstname && <p>{errors.Firstname.message}</p>}
    <br></br>
    <label>Enter second name</label>
    <br></br>
    <input id="sname" type="text" {...register("secondname",{
        pattern:{
            value:/^[A-Za-z]+$/i,
            message:"second name is not according to the regex"
        }
    })}/>
    {
    errors.secondname && <p>{errors.secondname.message}</p>
    }
    <br></br>
    <button>Submit</button>
    </form>
    </>
)
}
export default Forms