import LinkList from "@/components/link-list";

const MENU_ITEMS = [{ href: "/financials/workflows/invoice", text: "Invoice" }];

export default function Financials() {
  return (
    <div className="text-center">
      <h1 className="text-6xl mb-8">Invoice</h1>
      <LinkList items={MENU_ITEMS} />
    </div>
  );
}
