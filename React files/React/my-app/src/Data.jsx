import { useState } from "react";

function Data() {
  const [data, setData] = useState([]); 
  const [name, setName] = useState(""); 
  const [age, setAge] = useState(0); 
  const [address, setAddress] = useState(""); 

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:3000/users");
      const info = await response.json(); 
      console.log(info); 
      setData(info); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault(); 
    const newUser = { user: name, age: Number(age), Address: address };
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const addedUser = await response.json();
        console.log("Added user:", addedUser);
        setData([...data, addedUser]); 
        setName("");            SSSX
        setAge(0);
        setAddress("");
      } else {
        console.error("Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  }

  return (
    <>
      <h1>This is fetched data</h1>
      <button onClick={fetchData}>Fetch Data</button>
      <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, index) => (
            <tr key={index}>
              <td>{e.user}</td>
              <td>{e.age}</td>
              <td>{e.Address}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Add a New User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add new user"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <br />
        <input
          type="number"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <br />
        <br />
        <button type="submit">Add User</button>
      </form>
    </>
  );
}

export default Data;
