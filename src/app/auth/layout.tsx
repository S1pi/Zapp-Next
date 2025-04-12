export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-primary relative">
      {/* Images are not absolutely must but they are nice to have */}
      <img
        src="/mersu-eqe.png"
        alt=""
        className="absolute top-1/2 transform -translate-y-1/2 left-1/6 -translate-x-1/2 -scale-x-100"
        width="350"
      />
      <img
        src="/Zapp-auto-musta.png"
        alt=""
        className="absolute top-1/2 transform -translate-y-1/2 right-1/6 translate-x-1/2"
        width="350"
      />
      <main className="flex-1 flex items-center justify-center p-20 min-h-screen">
        {children}
      </main>
    </div>
  );
}
