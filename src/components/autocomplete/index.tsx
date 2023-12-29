import { ChangeEvent, FC, KeyboardEvent, useState } from "react";

interface AutocompleteProps {
  options: string[];
}

const Autocomplete: FC<AutocompleteProps> = ({ options }) => {
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const [userInput, setUserInput] = useState<string>("");
  const [activeOptionIndex, setActiveOptionIndex] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value;
    const filtered = options.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    setFilteredOptions(filtered);
    setUserInput(userInput);
    setActiveOptionIndex(0);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setUserInput(filteredOptions[activeOptionIndex]);
      setFilteredOptions([]);
    } else if (e.key === "ArrowUp") {
      if (activeOptionIndex === 0) return;
      setActiveOptionIndex(activeOptionIndex - 1);
    } else if (e.key === "ArrowDown") {
      if (activeOptionIndex - 1 === filteredOptions.length) return;
      setActiveOptionIndex(activeOptionIndex + 1);
    }
  };

  const SuggestionsListComponent = () => {
    return filteredOptions.length ? (
      <ul className="absolute z-10 w-96 bg-slate-500 rounded-md shadow-lg max-h-96 overflow-y-auto">
        {filteredOptions.map((suggestion, index) => {
          return (
            <li
              className={`
                    p-4 bg-slate-500 ${
                      index === activeOptionIndex ? "bg-slate-700" : ""
                    }
                `}
              key={suggestion}
              onClick={() => onClick(suggestion)}
            >
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : (
      <div className="absolute z-10 w-96 bg-slate-500 rounded-md shadow-lg p-4">
        <em>No suggestions available.</em>
      </div>
    );
  };

  const onClick = (suggestion: string) => {
    setFilteredOptions([]);
    setUserInput(suggestion);
    setActiveOptionIndex(0);
  };

  return (
    <div className="relative">
      <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
        className="text-black p-4 w-96 rounded-md"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isFocused && <SuggestionsListComponent />}
    </div>
  );
};

export default Autocomplete;
