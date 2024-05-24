import { Input } from "@/components/ui/input";
import searchIcon from "@/assets/icons/search-svgrepo-com.svg";
import { useState } from "react";

function SearchInput({ inputValue = "", onSearch }) {
  const [value, setValue] = useState(inputValue);
  const handleChange = (e) => {
    const searchValue = e.target.value;
    setValue(searchValue);
    onSearch(searchValue);
  };
  return (
    <div className="relative w-[10rem]">
      <Input
        onChange={handleChange}
        value={value}
        placeholder="Search here"
        className="px-8 rounded-3xl bg-white"
      />
      <img
        src={searchIcon}
        alt="search-icon"
        className="w-4 aspect-square absolute inset-0 top-[0.7rem] left-3"
      />
      {value && (
        <span
          className="absolute top-[0.3rem] right-2 w-max px-2 cursor-pointer"
          onClick={() => {
            setValue("");
            onSearch("");
          }}
        >
          x
        </span>
      )}
    </div>
  );
}

export default SearchInput;
