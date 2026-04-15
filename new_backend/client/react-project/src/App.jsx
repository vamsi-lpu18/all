import React, { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import Navbar from "./Navbar";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { toast, ToastContainer } from "react-toastify";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const App = () => {
  const [Title, setTitle] = useState("");
  const [descr, setDescr] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = async () => {
    try {
      const data = await fetch("http://localhost:3000/api/todo/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: Title,
          message: descr,
          completed: false,
        }),
      });
      if (data.ok) {
        toast.success("Todo added successfully");
        setTodos((prev) => [
          ...prev,
          { title: Title, message: descr, completed: false },
        ]);
        setTitle("");
        setDescr("");
      } else {
        toast.error("Failed to add todo");
      }
    } catch (error) {
      console.log("error while adding todo", error);
    }
  };
  useEffect(() => {
    const fetchData  = async () => {
      // const res = await fetch("http://localhost:3000/api/todo/get");
      const res = await fetch("http://localhost:3000/api/todo/get", {
  credentials: 'include'
});
      const data = await res.json();
      setTodos(data);
    }
    fetchData()
  }, [])
  return (
    <>
      <div>
        <center>
          <Textarea
            className="w-5/17 align-super text-white mt-4"
            value={descr}
            onChange={(e) => setDescr(e.target.value)}
            placeholder="Enter description "
          />
          <Input
            type="text"
            placeholder="Add To do"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-5/17 align-super text-white mt-3"
          />
          <br />
          <br />
          <Button className="cursor-pointer" onClick={handleSubmit}>
            Add
          </Button>
        </center>
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
      <div className="flex flex-wrap gap-1  justify-center">
  {todos.map((ele) => (
    <div key={ele._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3.5">
      <Card className="w-full bg-gray-800 text-white">
        <CardHeader>
          <CardTitle>{ele.title}</CardTitle>
        </CardHeader>

        <CardContent>
          <p>{ele.message}</p>
        </CardContent>
      </Card>
    </div>
  ))}
</div>
    </>
  );
};

export default App;
