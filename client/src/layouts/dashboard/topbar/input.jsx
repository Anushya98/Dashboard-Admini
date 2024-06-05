import ClearButton from "@/components/ui/clear-btn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRef } from "react";

const SearchIcon = () => (
  <svg
    width="16px"
    height="16px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function InputComponent({ setSearchValue }) {
  const inputRef = useRef(null);
  return (
    <div className="relative w-[30%] flex items-center p-4">
      <Input
        placeholder="Search here"
        className="rounded-full mx-0.5 border-darkBlue h-10 p-4"
        ref={inputRef}
      />
      <ClearButton
        className="absolute right-[7.25rem] "
        value={inputRef?.current?.value}
        onClick={() => (inputRef.current.value = "")}
      />
      <Button
        variant="filled"
        className="inline-flex gap-1 absolute right-4 bg-darkBlue rounded rounded-3xl text-xs font-normal py-0 h-6 text-white"
        onClick={() => setSearchValue(inputRef.current.value)}
      >
        <SearchIcon />
        <span>Search</span>
      </Button>
    </div>
  );
}
