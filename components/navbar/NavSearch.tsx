"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

function NavSearch() {
  const searchParam = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [search, setSearch] = useState(
    searchParam.get("search")?.toString() || ""
  );

  const handlerSearch = useDebouncedCallback((value: string) => {
    const param = new URLSearchParams(searchParam);
    if (value) {
      param.set("search", value);
    } else {
      param.delete("search");
    }
    replace(`${pathname}?${param.toString()}`);
    console.log(param);
  }, 500);

  useEffect(() => {
    if (!searchParam.get("search")) {
      setSearch("");
    }
  }, [searchParam.get("search")]);
  return (
    <div className="bg-white flex border px-2 py-1 rounded-full  overflow-hidden  mx-auto ">
      <input
        type="email"
        placeholder="ویلا شمال..."
        className="w-full outline-none bg-white  pl-4 text-sm"
        onChange={(e) => {
          setSearch(e.target.value);
          handlerSearch(e.target.value);
        }}
      />
      <button
        type="button"
        className="bg-primary  transition-all text-white text-sm rounded-full px-5 py-1.5">
        جستجو
      </button>
    </div>
  );
}

export default NavSearch;
