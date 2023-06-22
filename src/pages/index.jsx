import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div
      className="hero min-h-screen bg-white"
      style={{
        backgroundImage: `url("/images/stock/photo-1507358522600-9f71e620c44e.jpg")`,
      }}
    >
      <div className="hero-content text-center text-neutral-content">
        <div className="bg-zinc-300 w-96 h-48 flex flex-row justify-around items-center">
          <div className="bg-black w-20 h-20"></div>
          <div>
            <h2>Nombre</h2>
            <h2>ID</h2>
            <h2>Tipo</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
