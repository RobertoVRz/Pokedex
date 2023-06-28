import React from "react";
import Image from "next/image";

function CardPokemon({ pokemon }) {
  return (
    <div className="card w-40 m-5 bg-base-100 shadow-xl">
      <figure className="px-10 mt-10">
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
            pokemon.url.split("/")[6]
          }.png`}
          alt="Shoes"
          className="object-cover"
          width={100}
          height={100}
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{pokemon.name}</h2>
        <div className="card-actions">
          <a
            role="button"
            className="btn"
            href={`/pokemon/${pokemon.url.split("/")[6]}`}
          >
            Ver info
          </a>
        </div>
      </div>
    </div>
  );
}

export default CardPokemon;
