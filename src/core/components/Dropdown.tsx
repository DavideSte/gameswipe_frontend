import { useCallback, useRef, useState } from "react";
import useOutsideClick from "../hooks/use-outside-click";
import { SquareCheck, Square, CircleCheck, Circle, X } from "lucide-react";

export interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  selectedOptions: Option["value"][];
  setSelectedOptions: (selectedOptions: Option["value"][]) => void;
  addOption?: (option: Option) => void;
  multiple?: boolean;
}

export default function Dropdown({
  options,
  selectedOptions,
  setSelectedOptions,
  addOption,
  multiple = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);
  const ref = useOutsideClick(closeDropdown);

  const toggleOption = (optionValue: string) => {
    if (multiple) {
      if (selectedOptions.includes(optionValue)) {
        setSelectedOptions(selectedOptions.filter((value) => value !== optionValue));
      } else {
        setSelectedOptions([...selectedOptions, optionValue]);
      }
    } else {
      if (selectedOptions.includes(optionValue)) {
        setSelectedOptions([]);
      } else {
        setSelectedOptions([optionValue]);
        setIsOpen(false);
      }
    }
  };

  const handleAddOption = addOption
    ? () => {
        if (!addOption) return;
        const trimmedSearch = search.trim();
        if (trimmedSearch === "") return;
        // maybe use some unique id here instead of value
        addOption({ value: trimmedSearch, label: trimmedSearch });
        toggleOption(trimmedSearch);
        setSearch("");
      }
    : undefined;

  const selectedOptionsObject = options.filter((option) => selectedOptions.includes(option.value));

  return (
    <div ref={ref} className="relative w-full">
      <DropdownInput
        selectedOptions={selectedOptionsObject}
        setSelectedOptions={setSelectedOptions}
        toggleOption={toggleOption}
        search={search}
        setSearch={setSearch}
        setDropdown={setIsOpen}
        isOpen={isOpen}
      />
      {isOpen && (
        <DropdownMenu
          setSearch={setSearch}
          handleAddOption={handleAddOption}
          options={options}
          toggleOption={toggleOption}
          search={search}
          selectedOptions={selectedOptions}
          multiple={multiple}
        />
      )}
    </div>
  );
}

interface DropdownInputProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  selectedOptions: Option[];
  setSelectedOptions: (selectedOptions: Option["value"][]) => void;
  setDropdown: (isOpen: boolean) => void;
  isOpen: boolean;
  toggleOption: (optionValue: Option["value"]) => void;
}

const DropdownInput = ({
  selectedOptions,
  setSelectedOptions,
  search,
  setSearch,
  setDropdown,
  isOpen,
  toggleOption,
}: DropdownInputProps) => {
  const divInputContainer = useRef<HTMLDivElement>(null);
  const atLeastOneOptionSelected = selectedOptions.length > 0;

  const reset = () => setSelectedOptions([]);

  const toggleDropdown = () => {
    setDropdown(!isOpen);
  };

  const openDropdown = () => {
    setDropdown(true);
  };

  const closeDropdown = () => {
    setDropdown(false);
  };

  return (
    <div
      onClick={toggleDropdown}
      className="flex bg-white rounded-md border focus-within:border-blue-300 duration-200"
    >
      {/* show selected options and input to search */}
      <div
        ref={divInputContainer}
        className="flex flex-1 px-2 py-1 gap-y-1 [] text-sm  flex-wrap items-center max-h-16 gap-1 lg:max-h-40 overflow-auto hide-scrollbar"
        onClick={toggleDropdown}
      >
        {selectedOptions.map((selectedOption) => (
          <SelectedLabel
            key={selectedOption.value}
            onClick={() => toggleOption(selectedOption.value)}
            label={selectedOption.label}
          />
        ))}
        <div className="flex-1 ml-[-0.25rem]">
          <input
            onChange={(event) => setSearch(event.target.value)}
            className={` outline-none px-2 text-sm py-2 sm:py-0 font-medium ${
              atLeastOneOptionSelected ? "w-full" : "w-full"
            } `}
            onKeyDown={openDropdown}
            type="text"
            placeholder={atLeastOneOptionSelected ? "" : "Select a value..."}
            value={search}
          />
        </div>
      </div>
      {/* button to reset selected options */}
      <div
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          reset();
          closeDropdown();
        }}
        className="border-l my-[6px] flex items-center px-[6px] sm:px-1  text-black hover:text-black text-xl cursor-pointer"
      >
        <X size={20} strokeWidth={2.6} />
      </div>
    </div>
  );
};

const SelectedLabel = ({ label, onClick }: { label: string; onClick: () => void }) => {
  return (
    <div className="w-fit whitespace-nowrap bg-slate-100 border border-slate-200 rounded-md pl-2 pr-1 flex text-xs gap-1 h-6 items-center">
      <p className="truncate max-w-12">{label}</p>
      <div
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <X stroke="red" size={15} strokeWidth={3} />
      </div>
    </div>
  );
};

interface DropdownMenuProps {
  options: Option[];
  toggleOption: (optionValue: string) => void;
  search: string;
  selectedOptions: string[];
  handleAddOption: (() => void) | undefined;
  multiple: boolean;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const MAX_RENDERED_OPTIONS = 20;
const STEP_RENDERED_OPTIONS = 20;

const DropdownMenu = ({
  options,
  toggleOption,
  search,
  selectedOptions,
  handleAddOption,
  multiple,
  setSearch,
}: DropdownMenuProps) => {
  const filteredOptions = options.filter((option) => {
    return option.label.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });

  const refDiv = useRef<HTMLDivElement>(null);
  const optionNumber = filteredOptions.length;
  const [numberOfRenderedOptions, setNumberOfRenderedOptions] = useState(MAX_RENDERED_OPTIONS);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (optionNumber <= MAX_RENDERED_OPTIONS) return;
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 100;
    setNumberOfRenderedOptions((prev) => (isAtBottom ? prev + STEP_RENDERED_OPTIONS : prev));
  };

  return (
    <div
      ref={refDiv}
      onScroll={handleScroll}
      className="absolute z-50 shadow-lg border border-black/10 left-0 bg-white max-h-40 overflow-auto mt-1 w-full rounded-md hide-scrollbar  "
    >
      <div className="[&>div:not(:last-child)]:border-b">
        {[...filteredOptions.slice(0, numberOfRenderedOptions)].map((option) => (
          <CheckboxItem
            key={option.value}
            option={option}
            isSelected={selectedOptions.includes(option.value)}
            onClick={() => {
              toggleOption(option.value);
              setSearch("");
            }}
            multiple={multiple}
          />
        ))}
      </div>
      {filteredOptions.length === 0 && search.length > 0 && (
        <div className="py-3 px-3 text-sm text-black">
          <p className="flex  items-center ">No options.</p>
          {handleAddOption && (
            <>
              <hr className="my-0" />
              <p
                onClick={() => handleAddOption()}
                className="flex h-8 items-center cursor-pointer text-blue-600/90"
              >
                {" "}
                + add "<b>{search}</b>".
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

interface CheckboxItemProps {
  option: Option;
  isSelected: boolean;
  onClick: (value: string) => void;
  multiple: boolean;
}

const CheckboxItem = ({ option, isSelected, onClick, multiple }: CheckboxItemProps) => {
  const { value, label } = option;

  const handleClick = () => {
    onClick(value);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center py-3 px-3 gap-2 border-slate-200 cursor-pointer text-slate-600 text-sm truncate"
    >
      {multiple ? (
        isSelected ? (
          <SquareCheck size={15} strokeWidth={2} />
        ) : (
          <Square size={15} strokeWidth={2} />
        )
      ) : isSelected ? (
        <CircleCheck size={15} strokeWidth={2} />
      ) : (
        <Circle size={15} strokeWidth={2} />
      )}
      <p
        className={`font-medium cursor-pointer rounded-sm truncate duration-200 whitespace-nowrap flex gap-2 items-center`}
      >
        {label}
      </p>
    </div>
  );
};
