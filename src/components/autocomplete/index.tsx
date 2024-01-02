import { ChangeEvent, FC, useState } from "react";
import { useActiveOptionIndex } from "./hooks/use-active-option-index";
import { useSearch } from "./hooks/use-search";

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
  const { onChange: onChangeSearch, userInput } = useSearch(onSearch);
  const filteredOptions = options.filter(
    (option) => option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
  );
  const { activeOptionIndex, onKeyDown, resetActiveOptionIndex } =
    useActiveOptionIndex({
      options,
      onChangeSearch,
      onSelect,
    });
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeSearch(e.target.value);
    resetActiveOptionIndex();
  };

  const onClick = (option: string) => {
    onChangeSearch(option);
    resetActiveOptionIndex();
    onSelect?.(option);
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
