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
      (option) => option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    setFilteredOptions(filtered);
    setUserInput(userInput);
    setActiveOptionIndex(0);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const isEnterKey = e.key === "Enter";
    const isArrowUpKey = e.key === "ArrowUp";
    const isArrowDownKey = e.key === "ArrowDown";

    if (isEnterKey) {
      setUserInput(filteredOptions[activeOptionIndex]);
      setFilteredOptions([]);
    } else if (isArrowUpKey && activeOptionIndex !== 0) {
      setActiveOptionIndex(activeOptionIndex - 1);
    } else if (
      isArrowDownKey &&
      activeOptionIndex !== filteredOptions.length - 1
    ) {
      setActiveOptionIndex(activeOptionIndex + 1);
    }
  };

  const OptionsListComponent = () => {
    return filteredOptions.length ? (
      <ul className="absolute z-10 w-96 bg-slate-500 rounded-md shadow-lg max-h-96 overflow-y-auto">
        {filteredOptions.map((option, index) => {
          return (
            <li
              className={`
                    p-4 bg-slate-500 ${
                      index === activeOptionIndex ? "bg-slate-700" : ""
                    } hover:bg-slate-700 cursor-pointer
                `}
              key={option}
              onClick={() => onClick(option)}
            >
              {option}
            </li>
          );
        })}
      </ul>
    ) : (
      <div className="absolute z-10 w-96 bg-slate-500 rounded-md shadow-lg p-4">
        <em>No options available.</em>
      </div>
    );
  };

  const onClick = (option: string) => {
    setFilteredOptions([]);
    setUserInput(option);
    setActiveOptionIndex(0);
  };

  return (
    <div className="relative">
      <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
        className="text-black p-4 w-96 rounded-md outline-none focus:ring-2 focus:ring-slate-500"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isFocused && <OptionsListComponent />}
    </div>
  );
};

export default Autocomplete;
