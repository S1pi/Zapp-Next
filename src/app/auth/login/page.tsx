import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      {/* Images are not absolutely must but they are nice to have */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-20 bg-no-repeat bg-contain"
        style={{
          backgroundImage: `url('/zapp-logo-notext-base.png')`,
        }}
      ></div>

      <Image
        src="/mersu-eqe.png"
        alt=""
        className="absolute top-1 transform left-1/5 -translate-x-1/2 -scale-x-100"
        width="450"
        height="450"
      />
      <Image
        src="/Zapp-auto-musta.png"
        alt=""
        className="absolute bottom-0 transform left-1/3 -translate-x-1/2 z-10"
        width="700"
        height="600"
      />
      <div className="bg-primary flex flex-col items-center p-8 h-full w-1/3 relative rounded-2xl shadow-loginform z-50 xl:mr-20">
        {/* <div className="absolute top-14 p-2">
        <img src="/zapp-text-logo.png" alt="Logo" width="450" />
        </div> */}
        {/* Image Container */}
        <div className="flex-1 pt-6 pb-6 flex items-center justify-center">
          <Image
            src="/zapp-text-logo.png"
            alt="Logo"
            width="450"
            height="450"
          />
        </div>
        {/* Form Container */}
        <h1 className="text-secondary font-semibold">Kirjaudu sisään</h1>
        <form className="flex flex-col gap-8 max-w-sm w-full flex-2 justify-center text">
          <input
            type="text"
            placeholder="Sähköposti tai puhelin"
            className="border border-card-stroke rounded-2xl p-2 focus:ring-2 focus:ring-seabed-green focus:outline-none placeholder:text-black-zapp placeholder:opacity-50"
          />
          <input
            type="password"
            placeholder="Salasana"
            className="border border-card-stroke rounded-2xl p-2 focus:ring-2 focus:ring-seabed-green focus:outline-none placeholder:text-black-zapp placeholder:opacity-50"
          />
          <button className="bg-secondary text-white rounded-2xl p-2 hover:bg-black-zapp transition duration-300 ease-in-out cursor-pointer">
            Kirjaudu
          </button>
        </form>
        {/* <div className="bg-primary text-secondary rounded p-4 flex flex-col gap-2 shadow-loginform">
          <h3>Haluatko ryhtyä ZAPP-vuokraajaksi?</h3>
          <p>Rekisteröi yrityksesi ja luo oma käyttäjätilisi helposti</p>
          <button className="bg-black-zapp text-white rounded p-2 hover:bg-black-zapp transition duration-300 ease-in-out cursor-pointer hover:text-black-zapp">
            Rekisteröidy Nyt
          </button>
        </div> */}
        <div className="flex flex-col gap-2 justify-between items-center pb-4 text-black-zapp">
          <h5 className="text-lg font-bold">
            Haluatko ryhtyä ZAPP-vuokraajaksi?
          </h5>
          <p>Rekisteröi yrityksesi ja luo oma käyttäjätilisi</p>
          <Link
            href={"/auth/register"}
            className="bg-seabed-green text-primary rounded-2xl p-3 hover:bg-night-sky-blue transition duration-300 ease-in-out cursor-pointer hover:text-black-zapp w-7/8 text-center"
          >
            Luo tili
          </Link>
        </div>
      </div>
    </>
  );
}
