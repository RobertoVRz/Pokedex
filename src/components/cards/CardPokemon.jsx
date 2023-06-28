import React from "react";
import Image from "next/image";

function CardPokemon({ Nombre, ID, Tipo, Habilidad }) {
  return (
    <div className="card bg-zinc-300 shadow-xl w-80 h-60 flex flex-row justify-center items-center hover:w-96 hover:h-64">
      <figure className="m-5">
        <Image
          src="/pixabay.com/es/illustrations/pikachu-pokemon-personaje-5527377/"
          alt=""
          width={200}
          height={200}
        />
      </figure>
      <div className="text-black m-5">
        <h1 className="font-bold text-xl">{Nombre}Nombre</h1>
        <h2>{ID}ID</h2>
        <h2>{Tipo}Tipo</h2>
        <h2>{Habilidad}Habilidad</h2>
      </div>
    </div>
  );
}

export default CardPokemon;
