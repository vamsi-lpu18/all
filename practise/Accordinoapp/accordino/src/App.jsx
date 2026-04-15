import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const ques = await fetch("https://opentdb.com/api.php?amount=10");
        const arr = await ques.json();
        // Add a visible property to each question
        const updatedData = arr.results.map((item) => ({ ...item, visible: false }));
        setData(updatedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, []);

  const toggleVisibility = (index) => {
    setData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, visible: !item.visible } : item
      )
    );
  };

  return (
    <div className="flex justify-center mt-[20px]">
      {loading ? (
        <p>Loading questions...</p>
      ) : data.length === 0 ? (
        <p>No questions available.</p>
      ) : (
        <ol className="w-[90%]">
          {data.map((ele, i) => (
            <li
              key={i}
              className="flex flex-col border-2 m-2.5 p-3.5 rounded-2xl text-[16px] font-bold"
            >
              <div className="flex justify-between items-center">
                <span>{ele.question}</span>
                <span
                  className="bg-amber-300 text-2xl border-2 rounded font-bold cursor-pointer w-[30px] text-center"
                  onClick={() => toggleVisibility(i)}
                >
                  {ele.visible ? "-" : "+"}
                </span>
              </div>
              {ele.visible && (
                <p className="mt-2 text-green-700 font-normal">
                  Correct Answer: {ele.correct_answer}
                </p>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default App;
