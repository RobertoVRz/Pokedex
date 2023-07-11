import { useState, useEffect, useRef } from "react";
import { Inter } from "next/font/google";
import { FaSistrix, FaXmark } from "react-icons/fa6";
import CardPokemon from "@/components/cards/CardPokemon";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [results, setResults] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [clearFilter, setClearFilter] = useState(false);
  const searchParam = useRef("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setPokemonList(data.results);
      });
  }, []);

  const handleSearch = () => {
    const data = searchParam.current.value;
    const filtro = pokemonList.filter((pokemon) => pokemon.name.includes(data));
    setPokemonList(filtro);
    setClearFilter(true);
  };

  const handleNavigation = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setPokemonList(data.results);
      });
  };

  const handleClearFilter = () => {
    searchParam.current.value = "";
    setPokemonList(results.results);
    setClearFilter(false);
  };

  return (
    <div className="h-screen w-screen overflow-y-auto flex flex-col text-neutral-content bg-white pt-20">
      <div className="flex justify-center items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Escribe el nombre del pokemon"
            ref={searchParam}
            className="input input-bordered w-96 my-5 text-white placeholder:text-white"
          />
          <button
            className={
              `btn btn-circle btn-ghost btn-sm absolute right-2 top-7 ` +
              (!clearFilter && "hidden")
            }
            onClick={() => handleClearFilter()}
          >
            <FaXmark />
          </button>
        </div>
        <button
          className="btn btn-circle btn-outline btn-sm ml-2"
          onClick={() => handleSearch()}
        >
          <FaSistrix />
        </button>
      </div>
      <div className="flex flex-wrap justify-center">
        {pokemonList?.length > 0 &&
          pokemonList.map((pokemon, index) => (
            <CardPokemon pokemon={pokemon} key={index} />
          ))}
      </div>
      <div className="join grid grid-cols-2">
        <button
          className="join-item btn btn-outline my-5 mx-2"
          onClick={() => handleNavigation(results?.previous)}
        >
          Previous page
        </button>
        <button
          className="join-item btn btn-outline my-5 mx-2"
          onClick={() => handleNavigation(results?.next)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
