import { useRef } from "react";

export default function Useref() {
  const timer = useRef(0);

  const handle = () => {
    timer.current = timer.current + 1;
    console.log("Current count is:", timer.current); // Log the value since it won't re-render
  };

  return (
    <>
      <div>
        <h1>Count is: {timer.current}</h1> 
        <button onClick={handle}>Increment</button>
      </div>
    </>
  );
}
