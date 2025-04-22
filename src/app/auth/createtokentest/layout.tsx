export default function TokenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-secondary relative">
      <main className="flex-1 flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}
