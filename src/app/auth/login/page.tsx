export default function LoginPage() {
  return (
    <div className="bg-secondary flex flex-col items-center p-4 h-full w-1/3 relative rounded-2xl shadow-loginform">
      {/* <div className="absolute top-14 p-2">
        <img src="/zapp-text-logo.png" alt="Logo" width="450" />
      </div> */}
      {/* Image Container */}
      <div className="flex-1 pt-6 pb-6 flex items-center justify-center">
        <img src="/zapp-text-logo.png" alt="Logo" width="450" />
      </div>
      {/* Form Container */}
      <h1 className="text-black-zapp font-semibold">Kirjaudu sisään</h1>
      <form className="flex flex-col gap-8 max-w-sm w-full mt-10 flex-2">
        <input
          type="text"
          placeholder="Sähköposti tai puhelin"
          className="border border-black-zapp rounded p-2 focus:ring-2 focus:ring-black-zapp focus:outline-none"
        />
        <input
          type="password"
          placeholder="Salasana"
          className="border border-black-zapp rounded p-2 focus:ring-2 focus:ring-black-zapp focus:outline-none"
        />
        <button className="bg-black-zapp text-white rounded p-2 hover:bg-black-zapp transition duration-300 ease-in-out cursor-pointer hover:text-black-zapp">
          Kirjaudu
        </button>
      </form>
    </div>
  );
}
