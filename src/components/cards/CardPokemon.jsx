import React from "react";
import Image from "next/image";

function CardPokemon() {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure className="px-10 mt-10">
        <Image
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          alt="Shoes"
          className="object-cover"
          width={100}
          height={100}
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">Shoes!</h2>

        <div className="card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default CardPokemon;
