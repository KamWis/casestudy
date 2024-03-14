import Link from "next/link";

const LinkList = ({ items }: { items: { href: string; text: string }[] }) => {
  return (
    <ul className="list-disc inline-block">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href}>{item.text}</Link>
        </li>
      ))}
    </ul>
  );
};

export default LinkList;
