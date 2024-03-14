"use client";

import { ChangeEventHandler } from "react";
import {
  MagnifyingGlassIcon,
  CalendarIcon,
  ClockIcon,
  InfoCircledIcon,
  LayoutIcon,
  FontStyleIcon,
} from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";

export default function Filters({
  onSearch,
}: {
  onSearch: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <>
      <div className="w-full md:w-1/3">
        <TextField.Root className="[&>*]:!bg-transparent [&>*]:!shadow-none">
          <TextField.Slot>
            <MagnifyingGlassIcon height="24" width="24" />
          </TextField.Slot>
          <TextField.Input
            placeholder="Search & filter"
            className="!placeholder-gray-500 !text-gray-500 !text-lg"
            onChange={onSearch}
          />
        </TextField.Root>
      </div>
      <div className="w-2/4 md:w-1/3">
        <TextField.Root className="[&>*]:!bg-transparent [&>*]:!shadow-none">
          <TextField.Slot>
            <CalendarIcon height="24" width="24" />
          </TextField.Slot>
          <TextField.Input
            placeholder="Date range"
            className="!placeholder-gray-500 !text-gray-500 !text-lg"
          />
        </TextField.Root>
      </div>
      <div className="w-2/4 md:w-1/3 flex items-center gap-4 text-gray-500 justify-end cursor-pointer">
        <FontStyleIcon height="24" width="24" />
        <CalendarIcon height="24" width="24" />
        <InfoCircledIcon height="24" width="24" />
        <ClockIcon height="24" width="24" />
        <LayoutIcon height="24" width="24" />
      </div>
    </>
  );
}
