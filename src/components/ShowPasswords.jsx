import SearchLineIcon from "remixicon-react/SearchLineIcon";
import { PasswordCard } from "./PasswordCard";
import { useEffect, useState } from "react";

export const ShowPasswords = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Flag for loading state
  const [error, setError] = useState(null); // State to store any errors

  // Fetch passwords data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await localStorage.getItem("passwords");
        setData(JSON.parse(jsonData) || []);
      } catch (error) {
        setError("Error fetching passwords");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterResults = () => {
    const title = document.getElementById("title").value.toLowerCase(); // Get search term and convert to lowercase

    // Filter the data based on the search term
    const filteredData = data.filter((password) =>
      password.title.toLowerCase().includes(title)
    );

    // Update the state with the filtered data
    setData(filteredData);
    if (data.length == 0 || title === "")
      setData(JSON.parse(localStorage.getItem("passwords")) || []);
  };

  return (
    <div className="main-showpass">
      <div className="img-con"></div>
      <div className="heading">
        <h2>
          Your passwords
          {/* <HowMany /> */}
        </h2>
        <div className="input-con">
          <div className="icon-con">
            <SearchLineIcon className="icon" />
          </div>
          <input
            type="text"
            placeholder="Ex. instagram"
            id="title"
            onChange={() => filterResults()}
          />
        </div>
      </div>
      <div className="passwords-con">
        {data?.map((password, index) => (
          <PasswordCard
            key={index}
            password={password}
            data={data}
            setData={setData}
          />
        ))}
      </div>
    </div>
  );
};
