import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const info = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${page}&sparkline=false`
        );
        const ndata = await info.json();
        setData((prev) => [...prev, ...ndata]);
        console.log(ndata);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchdata();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-around">
        {data.map((ele, i) => (
          <img
            key={ele.id} 
            src={ele.image}
            alt={ele.name} 
            className="m-4 p-1 size-[300px] border-2 rounded-2xl brightness-75 border-amber-300 hover:scale-90 transition-transform duration-8000 hover:brightness-110 hover:animate-ping"
          />
        ))}
      </div>
    </>
  );
}

export default App;
