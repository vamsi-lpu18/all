
import { useState,useEffect } from "react";

function App() {
  const [val, setVal] = useState("");
  const [data, setData] = useState(null); // Initialize as null
  const [error, setError] = useState(""); // For error handling

  const handleSearch = async () => {
    try {
      setError(""); // Clear any previous error
      setData(null); // Reset data for a new search

      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${val}`
      );

      if (!response.ok) {
        throw new Error("Word not found!");
      }

      const result = await response.json();
      setData(result[0]); // Store the first result\
      console.log(result[0])
      // setVal('')
    } catch (err) {
      setError(err.message); // Display error message
    }
  };
  // useEffect(() => {
  //   if (data) {
  //     console.log("Updated data in state:", data); // Log updated data after state update
  //   }
  // }, [data]);
  return (
    <>
    <center>
      <div style={{ textAlign: "center", marginTop: "20px" ,border:"2px solid black",width:"50%",height:"300px",
        borderRadius:"10px",color:"blue",backgroundColor:"#ff52"
      }}>
        <h1>Dictionary</h1>
        <input
          type="text"
          placeholder="Enter Text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {data && (
          <div>
            <h2>Word: {data.word}</h2>
            {data.meanings && data.meanings.length > 0 ? (
              <div>
                <p>
                  <strong>Definition:</strong>{" "}
                  {data.meanings[0]?.definitions[0]?.definition || "No definition available"}
                </p>
                <p>
                  <strong>Part of Speech: {data.meanings[0].partOfSpeech}</strong><br></br>
                  {/* <strong>Antonym: {data.meanings[1].definitions[0].antonyms}</strong> */}
                </p>
              </div>
            ) : (
              <p>No meanings available for this word.</p>
            )}
          </div>
        )}
      </div>
      </center>
    </>
  );
}

export default App;
