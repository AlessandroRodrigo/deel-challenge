import { useCallback, useEffect, useState } from "react";
import Autocomplete from "./components/autocomplete";

async function getOptions(searchTerm?: string) {
  const urlParams = new URLSearchParams();
  searchTerm && urlParams.append("name_like", searchTerm || "");

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users?${urlParams.toString()}`
  );
  const data = await response.json();
  return data.map((user: { name: string }) => user.name);
}

function App() {
  const [options, setOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = useCallback((searchTerm?: string) => {
    setIsLoading(true);
    getOptions(searchTerm)
      .then((options) => {
        setOptions(options);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <div className="bg-black min-h-screen w-screen font-bold text-white flex items-center justify-center">
      <Autocomplete
        options={options}
        onSearch={handleSearch}
        onSelect={(option) => console.log("Select:", option)}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
