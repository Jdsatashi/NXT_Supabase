"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { subjects } from "@/constants";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const allSubjects = ["all", ...subjects];

export function SubjectFilter() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [subject, setSubject] = useState("");

  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (value && allSubjects.includes(value)) {
      setSubject(value);
    }
  }, [value]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (subject && subject !== "all") {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "subject",
          value: subject,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathName === "/companions") {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["subject"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [pathName, router, searchParams, subject]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value !== ""
            ? allSubjects.find((subject) => subject === value)
            : "Select subject..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search subject..." className="h-9" />
          <CommandList>
            <CommandEmpty>No subject found.</CommandEmpty>
            <CommandGroup>
              {allSubjects.map((subject) => (
                <CommandItem
                  key={subject}
                  value={subject}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {subject[0].toUpperCase() + subject.slice(1)}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === subject ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
