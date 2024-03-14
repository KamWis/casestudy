import LinkList from "@/components/link-list";

const MENU_ITEMS = [{ href: "/financials", text: "Financials" }];

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-6xl mb-8">Menu</h1>
      <LinkList items={MENU_ITEMS} />
    </div>
  );
}
