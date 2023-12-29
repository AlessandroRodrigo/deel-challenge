import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from "react";
import { useDebounce } from "../../hooks/use-debounce";

interface AutocompleteProps {
  options: string[];
  onSelect?: (option: string) => void;
  onSearch?: (searchTerm: string) => void;
  isLoading?: boolean;
}

const Autocomplete: FC<AutocompleteProps> = ({
  options,
  onSearch,
  onSelect,
  isLoading,
}) => {
  const [userInput, setUserInput] = useState<string>("");
  const debouncedUserInput = useDebounce(userInput, 500);
  const [activeOptionIndex, setActiveOptionIndex] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    onSearch?.(debouncedUserInput);
  }, [debouncedUserInput, onSearch]);

  const filteredOptions = options.filter(
    (option) => option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value;
    setUserInput(userInput);
    setActiveOptionIndex(0);
  };

  const onClick = (option: string) => {
    setUserInput(option);
    setActiveOptionIndex(0);
    onSelect?.(option);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const isEnterKey = e.key === "Enter";
    const isArrowUpKey = e.key === "ArrowUp";
    const isArrowDownKey = e.key === "ArrowDown";

    if (isEnterKey) {
      setUserInput(filteredOptions[activeOptionIndex]);
      onSelect?.(filteredOptions[activeOptionIndex]);
    } else if (isArrowUpKey && activeOptionIndex !== 0) {
      setActiveOptionIndex(activeOptionIndex - 1);
    } else if (
      isArrowDownKey &&
      activeOptionIndex !== filteredOptions.length - 1
    ) {
      setActiveOptionIndex(activeOptionIndex + 1);
    }
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
        onBlur={() => setTimeout(() => setIsFocused(false), 100)} // Delay to allow onClick to fire
      />
      {isFocused && isLoading && (
        <div className="absolute z-10 w-96 bg-slate-500 rounded-md shadow-lg p-4">
          Loading...
        </div>
      )}
      {isFocused && !isLoading && (
        <OptionsList
          activeOptionIndex={activeOptionIndex}
          onClick={onClick}
          options={filteredOptions}
          userInput={userInput}
        />
      )}
    </div>
  );
};

interface OptionsListProps {
  options: string[];
  activeOptionIndex: number;
  onClick: (option: string) => void;
  userInput: string;
}

function OptionsList({
  activeOptionIndex,
  onClick,
  options,
  userInput,
}: OptionsListProps) {
  return options.length ? (
    <ul className="absolute z-10 w-96 bg-slate-500 rounded-md shadow-lg max-h-96 overflow-y-auto">
      {options.map((option, index) => {
        const startIndex = option
          .toLowerCase()
          .indexOf(userInput.toLowerCase());
        const endIndex = startIndex + userInput.length;

        const beforeMatch = option.slice(0, startIndex);
        const match = option.slice(startIndex, endIndex);
        const afterMatch = option.slice(endIndex);

        return (
          <li
            className={`p-4 bg-slate-500 hover:bg-slate-700 cursor-pointer ${
              index === activeOptionIndex ? "bg-slate-700" : ""
            }`}
            key={option}
            onClick={() => onClick(option)}
          >
            {beforeMatch}
            <span className="bg-yellow-600">{match}</span>
            {afterMatch}
          </li>
        );
      })}
    </ul>
  ) : (
    <div className="absolute z-10 w-96 bg-slate-500 rounded-md shadow-lg p-4">
      <em>No options available.</em>
    </div>
  );
}

export default Autocomplete;
