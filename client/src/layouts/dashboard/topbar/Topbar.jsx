import { useEffect, useState } from "react";
import Input from "./input";
import Right from "./right-box";

function Topbar() {
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    if (searchValue) console.log(searchValue);
  }, [searchValue]);
  return (
    <section className="min-h-[15dvh] border bg-white flex justify-between">
      <div className="w-[min(25dvw,15rem)] border-r grid place-items-center">
        Logo
      </div>
      <Input setSearchValue={setSearchValue} />
      <Right />
    </section>
  );
}

export default Topbar;
