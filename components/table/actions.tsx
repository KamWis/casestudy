import { MouseEventHandler } from "react";

import { TrashIcon } from "@radix-ui/react-icons";
import Button from "@/components/button";

export default function Actions({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <Button onClick={onClick} className="border-transparent text-red-600">
      <TrashIcon className="mr-2" /> Delete
    </Button>
  );
}
