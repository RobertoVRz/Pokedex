import { Inter } from "next/font/google";
import CardPokemon from "@/components/cards/CardPokemon";
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
        <CardPokemon />
      </div>
    </div>
  );
}
