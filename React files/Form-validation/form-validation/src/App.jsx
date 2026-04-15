import { useState } from "react";

function App() {
  const [fname, setFname] = useState("");
  const [sname, setSname] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle state for password visibility

  const handle = (e) => {
    e.preventDefault();
    if (fname && sname && pass && cpass) {
      if (pass === cpass) {
        alert("Submission successful");
        setFname("");
        setSname("");
        setPass("");
        setCpass("");
      } else alert("Password and Confirm Password should be the same");
    } else {
      alert("All fields are required");
    }
  };

  return (
    <>
      <center>
        <h1 style={{ margin: "20px 0", color: "#4CAF50" }}>React Forms</h1>
        <div
          style={{
            border: "3px solid #4CAF50",
            borderRadius: "10px",
            padding: "30px",
            width: "400px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <form onSubmit={handle}>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="fname" style={{ display: "block", fontWeight: "bold" }}>
                First Name:
              </label>
              <input
                type="text"
                id="fname"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  margin: "5px 0",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              {fname ? "" : <p style={{ color: "red" }}>First name is required</p>}
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="sname" style={{ display: "block", fontWeight: "bold" }}>
                Second Name:
              </label>
              <input
                type="text"
                id="sname"
                value={sname}
                onChange={(e) => setSname(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  margin: "5px 0",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              {sname ? "" : <p style={{ color: "red" }}>Second name is required</p>}
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="pass" style={{ display: "block", fontWeight: "bold" }}>
                Password:
              </label>
              <input
                type={showPassword ? "text" : "password"} // Toggle visibility
                id="pass"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  margin: "5px 0",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              {pass ? "" : <p style={{ color: "red" }}>Password is required</p>}
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="cpass" style={{ display: "block", fontWeight: "bold" }}>
                Confirm Password:
              </label>
              <input
                type={showPassword ? "text" : "password"} // Toggle visibility
                id="cpass"
                value={cpass}
                onChange={(e) => setCpass(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  margin: "5px 0",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              {cpass ? "" : <p style={{ color: "red" }}>Confirm Password is required</p>}
            </div>

            <div style={{ marginBottom: "15px" }}>
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPassword" style={{ marginLeft: "5px" }}>
                Show Passwords
              </label>
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </center>
    </>
  );
}

export default App;
