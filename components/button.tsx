import { ReactNode } from "react";
import clsx from "clsx";

export default function Button({
  className,
  onClick,
  children,
}: {
  className?: string;
  onClick?: (...args: any[]) => any;
  children: ReactNode;
}) {
  return (
    <button
      className={clsx(
        "border-1 flex items-center bg-gray-100 px-4 py-2 border-2 border-gray-300",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
