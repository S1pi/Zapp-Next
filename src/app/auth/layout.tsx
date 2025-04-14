export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-secondary relative">
      <main className="flex-1 flex items-center justify-end p-20 min-h-screen">
        {children}
      </main>
    </div>
  );
}
