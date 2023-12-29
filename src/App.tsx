import Autocomplete from "./components/autocomplete";

function App() {
  return (
    <div className="bg-black min-h-screen w-screen font-bold text-white flex items-center justify-center">
      <Autocomplete
        options={[
          "Alligator",
          "Bask",
          "Crocodilian",
          "Death Roll",
          "Eggs",
          "Jaws",
          "Reptile",
          "Solitary",
          "Tail",
          "Wetlands",
        ]}
      />
    </div>
  );
}

export default App;
