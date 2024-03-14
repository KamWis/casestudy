import clsx from "clsx";

export default function H1({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <h1 className={clsx("text-4xl md:text-7xl", className)}>{children}</h1>
  );
}
