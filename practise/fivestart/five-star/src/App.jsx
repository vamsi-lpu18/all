import { useState } from "react";

const arr = new Array(5).fill('★');

function App() {
  const [val, setVal] = useState();
  const [hover, setHover] = useState();
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
        <h1 className="text-center text-4xl font-semibold mb-4 text-gray-600">
          Five Star Rating App
        </h1>
        <ul className="list-none flex items-center justify-center text-6xl">
          {arr.map((ele, i) => {
            return (
              <li
                key={i}
                className={`cursor-pointer mx-2 ${
                  i < val || i < hover ? "text-amber-600" : "text-gray-400"
                }`}
                onClick={() => setVal(i + 1)}
                onMouseEnter={() => setHover(i + 1)}
                onMouseLeave={() => setHover()}
              >
                {ele}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
