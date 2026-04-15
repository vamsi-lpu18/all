
import { useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [task, setTask] = useState("");
  const [err, setErr] = useState("");

  const handle = () => {
    if (data.includes(task)) {
      setErr(`${task} is already there`);
      return;
    }
    if(task=="")
    {
      setErr("Task cannot be empty")
      return;
    }
    if (task.trim() === "") {
      setErr("Task cannot be empty")

      return;}
    setData((prev) => [...prev, task]);
    setTask("");
    setErr(""); // Clear the error if any
  };

  const handledel = (ele) => {
    const arr = data.filter((item) => item !== ele);
    setData(arr);
  };

  return (
    <>
      <h1 className="flex justify-center text-2xl font-bold">Todo App</h1>
      <div className="flex flex-col justify-center items-center mt-5 decoration-amber-200">
        <div className="relative w-64">
          <input
            type="text"
            className="border-2 border-gray-300 rounded-lg h-10 w-full px-3"
            onChange={(e) => setTask(e.target.value)}
            value={task}
            onKeyDown={(e) => {
              if (e.key === "Enter") return handle();
            }}
            placeholder="Enter your task"
          />
          {err && <p className="text-red-400 text-sm mt-2">{err}</p>}
        </div>
        <button
          className="bg-amber-200 px-4 py-2 mt-3 border-0 rounded-lg hover:scale-110 hover:bg-amber-400 hover:text-white transition-transform cursor-pointer"
          onClick={handle}
        >
          Add
        </button>
      </div>
      <div className="flex justify-center mt-5">
        <ol className="border-2 border-gray-200 rounded-2xl w-96">
          {data.map((ele, i) => (
            <li
              key={i}
              className="flex justify-between items-center text-lg p-1.5 m-2 font-light"
            >
              <span>{ele}</span>
              <button
                className="border-2 bg-red-500 text-white p-1 rounded-2xl hover:scale-110 transition-transform cursor-pointer"
                onClick={() => handledel(ele)}
              >
                Delete
              </button>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default App;
