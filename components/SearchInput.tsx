"use client";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function SearchInput() {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  // const query = searchParams.get("topic") || "";
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "topic",
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathName === "/companions") {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["topic"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);
  }, [searchQuery, router, searchParams, pathName]);
  return (
    <div className="realative border border-black rounded-lg items-center flex gap-2 px-2 py-1h-fit">
      <Image src="/icons/search.svg" alt="search" width={15} height={15} />
      <input
        className="outline-none"
        placeholder="Search companions..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;
