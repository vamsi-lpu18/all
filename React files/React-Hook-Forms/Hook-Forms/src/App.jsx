
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    toast.success("Form submitted successfully!");
    console.log("Form Data:", data);
  };

  useEffect(() => {
    if (errors.fname) toast.error(errors.fname.message);
    if (errors.sname) toast.error(errors.sname.message);
    if (errors.email) toast.error(errors.email.message);
    if (errors.phone) toast.error(errors.phone.message);
  }, [errors]);

  return (
    <>
      <h1>React Hook Forms</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{border:"3px solid black",width:"300px",height:"400px",padding:"10px", margin:"10px",background:"yellow"}}>
        <label>First Name:</label>
        <input
          type="text"
          {...register("fname", {
            required: "First name is required",
            minLength: {
              value: 3,
              message: "Minimum length is 3",
            },
            maxLength: {
              value: 10,
              message: "Maximum length is 10",
            },
          })}
        />
        {errors.fname && <p style={{ color: "red" }}>{errors.fname.message}</p>}

        <br /><br></br>
        <label>Second Name:</label>
        <input
          type="text"
          {...register("sname", {
            required: "Second name is required",
            minLength: {
              value: 3,
              message: "Minimum length is 3",
            },
            maxLength: {
              value: 10,
              message: "Maximum length is 10",
            },
          })}
        />
        {errors.sname && <p style={{ color: "red" }}>{errors.sname.message}</p>}

        <br /><br></br>
        <label>Email:</label>
        <input
          type="text"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid Email Format",
            },
          })}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

        <br /><br></br>
        <label>Phone:</label>
        <input
          type="number"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Invalid Mobile Number",
            },
          })}
        />
        {errors.phone && <p style={{ color: "red" }}>{errors.phone.message}</p>}

        <button type="submit" style={{ marginTop: "20px" }}>
          Submit
        </button>
      </form>
      <ToastContainer />
    </>
  );
}

export default App;
