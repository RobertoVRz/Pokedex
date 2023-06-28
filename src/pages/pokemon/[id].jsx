import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
export default function Pokemon() {
  const [pokemon, setPokemon] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${router.query.id}`)
        .then((res) => res.json())
        .then((data) => {
          setPokemon(data);
        });

      fetch(`https://pokeapi.co/api/v2/evolution-chain/${router.query.id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  }, [router.query.id]);

  useEffect(() => {
    console.log(pokemon);
  }, [pokemon]);

  return (
    <div className="h-screen w-screen overflow-y-auto flex flex-col text-neutral-content bg-white pt-20">
      <div className="flex flex-wrap">{<h1>{pokemon.name}</h1>}</div>
      <Image
        width={200}
        height={200}
        src={pokemon.sprites?.other?.["official-artwork"]?.front_default}
        alt={pokemon.name}
      />
    </div>
  );
}
