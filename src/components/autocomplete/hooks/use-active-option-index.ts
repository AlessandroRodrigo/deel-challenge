import { KeyboardEvent, useState } from "react";

type Props = {
  options: string[];
  onChangeSearch: (value: string) => void;
  onSelect?: (value: string) => void;
};

export const useActiveOptionIndex = ({
  onChangeSearch,
  onSelect,
  options,
}: Props) => {
  const [activeOptionIndex, setActiveOptionIndex] = useState<number>(0);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const isEnterKey = e.key === "Enter";
    const isArrowUpKey = e.key === "ArrowUp";
    const isArrowDownKey = e.key === "ArrowDown";

    if (isEnterKey) {
      onChangeSearch(options[activeOptionIndex]);
      onSelect?.(options[activeOptionIndex]);
    } else if (isArrowUpKey && activeOptionIndex !== 0) {
      setActiveOptionIndex(activeOptionIndex - 1);
    } else if (isArrowDownKey && activeOptionIndex !== options.length - 1) {
      setActiveOptionIndex(activeOptionIndex + 1);
    }
  };

  const resetActiveOptionIndex = () => setActiveOptionIndex(0);

  return {
    activeOptionIndex,
    onKeyDown,
    resetActiveOptionIndex,
  };
};
