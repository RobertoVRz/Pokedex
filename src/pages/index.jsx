import { Inter } from "next/font/google";
import CardPokemon from "@/components/cards/CardPokemon";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="hero min-h-screen bg-white">
      <div className="hero-content text-center text-neutral-content">
        <CardPokemon />
      </div>
    </div>
  );
}
