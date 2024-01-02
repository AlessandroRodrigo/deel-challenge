import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks/use-debounce";

export const useSearch = (onSearch?: (input: string) => void) => {
  const [userInput, setUserInput] = useState<string>("");
  const debouncedUserInput = useDebounce(userInput, 500);

  useEffect(() => {
    onSearch?.(debouncedUserInput);
  }, [debouncedUserInput, onSearch]);

  const onChange = (value: string) => {
    setUserInput(value);
  };

  return {
    userInput,
    onChange,
  };
};
