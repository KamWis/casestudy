export default function FinancialLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex bg-gray-100 m-auto justify-center h-full">
      {children}
    </main>
  );
}
