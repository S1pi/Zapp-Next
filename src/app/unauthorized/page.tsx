export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black-zapp">
      <h1 className="text-4xl font-bold text-red-600">Unauthorized</h1>
      <p className="mt-4 text-lg text-secondary">
        You do not have permission to access this page.
      </p>
    </div>
  );
}
