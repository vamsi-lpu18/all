import React, { useEffect, useState } from "react";
import "./index.css";

const FileExp = ({ data }) => {
  const [item, setItem] = useState([]);
  const [collapse, setCollapse] = useState({});

  useEffect(() => {
    setItem(data);
  }, [data]);

  const handleCollapse = (name) => {
    setCollapse((prev) => ({
      ...prev,
      [name]: !prev[name], 
    }));
  };

  return (
    <div>
      {item.map((ele, idx) => (
        <div key={idx}>
          <div
            className={`parent ${ele.type === "folder" ? "folder" : ""}`}
            onClick={() => ele.type === "folder" && handleCollapse(ele.name)} // only folders toggle
          >
            {ele.type === "folder"
              ? collapse[ele.name]
                ? "📁"
                : "📂"
              : "🗃️"}{" "}
            {ele.name}
          </div>

          <div className="child">
            {/* ✅ check collapse state for this folder */}
            {!collapse[ele.name] && ele.children && ele.type === "folder" && (
              <FileExp data={ele.children} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileExp;
