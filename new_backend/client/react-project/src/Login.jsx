import React, { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        navigate("/");
        toast.success("Login successful");
        
      } else {
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          toast.error(data.message || "Login failed");
        } catch {
          toast.error(text || "Login failed");
        }
      }
    } catch (error) {
      toast.error("An error occurred during login");
      console.log("Error during login:", error);
    }
  };

  return (
    <div>
      <center>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-5/17 align-super text-white mt-3"
        />
        <br />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-5/17 align-super text-white mt-3"
        />
        <br />
        <Button className="cursor-pointer mt-4" onClick={handleLogin}>
          Login
        </Button>
      </center>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;
