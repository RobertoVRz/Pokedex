import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Pokemon() {
  const [pokemon, setPokemon] = useState({});
  const [specieInfo, setSpecieInfo] = useState({});
  const [evoluciones, setEvoluciones] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${router.query.id}`)
        .then((res) => res.json())
        .then((data) => {
          setPokemon(data);
        });

      fetch(`https://pokeapi.co/api/v2/pokemon-species/${router.query.id}`)
        .then((res) => res.json())
        .then(async (data) => {
          setSpecieInfo(data);
        })
        .catch((error) => {
          console.error("Error fetching evolution chain:", error);
        });
    }
  }, [router.query.id]);

  useEffect(() => {
    if (specieInfo?.evolution_chain) {
      const url = specieInfo.evolution_chain.url;
      fetch(`${url}`)
        .then((res) => res.json())
        .then(async (data) => {
          const evolucion = await getEvolucion(data.chain);
          setEvoluciones(evolucion);
        })
        .catch((error) => {
          console.error("Error fetching evolution chain:", error);
        });
    }
  }, [specieInfo]);

  const getSprite = (url) => {
    return new Promise((resolve, reject) => {
      const id = url.split("/")[6];

      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const sprite =
            data.sprites?.other?.["official-artwork"]?.front_default;
          resolve(sprite);
        })
        .catch((error) => {
          console.error("Error fetching sprite:", error);
          reject(error);
        });
    });
  };

  const getEvolucion = async (evolucion) => {
    const evoluciones = [];

    if (evolucion.species?.name) {
      const { name, url } = evolucion.species;
      try {
        const sprite = await getSprite(evolucion.species.url);
        evoluciones.push({ name, url, sprite });
      } catch (error) {
        console.error("Error getting sprite:", error);
      }
      while (evolucion.evolves_to.length > 0) {
        evolucion = evolucion.evolves_to[0];
        const { name, url } = evolucion.species;
        try {
          const sprite = await getSprite(evolucion.species.url);
          evoluciones.push({ name, url, sprite });
        } catch (error) {
          console.error("Error getting sprite:", error);
        }
      }
    }
    return evoluciones;
  };

  const capitalizeFirstLetter = (string) => {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  };

  return (
    <div className="h-screen w-screen overflow-y-auto bg-[#EBF5F0] text-black py-20 px-5 lg:px-20">
      <div className="card bg-white shadow-2xl flex flex-col lg:flex-row justify-center">
        <Image
          width={350}
          height={200}
          src={pokemon.sprites?.other?.["official-artwork"]?.front_default}
          alt={pokemon.name}
        />
        <div className="card  w-96">
          <div className="card-body">
            <h1 className="text-3xl">{capitalizeFirstLetter(pokemon.name)}</h1>
            <div className="flex items-center">
              <h2 className="card-title mr-2">Altura:</h2>
              <p className="text-xl">{pokemon.height}</p>
            </div>
            <div className="flex items-center">
              <h2 className="card-title mr-2">Peso:</h2>
              <p className="text-xl">{pokemon.weight}</p>
            </div>
            <div className="flex items-center">
              <h2 className="card-title mr-2">Tipo:</h2>
              {pokemon?.types &&
                pokemon?.types?.map((tipo) => (
                  <div className="badge badge-outline mr-2">
                    {capitalizeFirstLetter(tipo.type.name)}
                  </div>
                ))}
            </div>
            <div className="flex items-center">
              <h2 className="card-title mr-2">Habilidades:</h2>
              {pokemon?.abilities &&
                pokemon?.abilities?.map((habilidad) => (
                  <div className="badge badge-outline mr-2">
                    {capitalizeFirstLetter(habilidad.ability.name)}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="card bg-white shadow-2xl my-5 p-10">
        <h1 className="text-3xl mb-5 text-center">Estadísticas</h1>
      </div>
      <div className="card bg-white shadow-2xl my-5 p-10">
        <h1 className="text-3xl mb-5 text-center">Evoluciones</h1>
        <div className="flex flex-wrap">
          {evoluciones?.length &&
            evoluciones?.map((evolucion, index) => (
              <div className="text-center" key={index}>
                <div className="border-black rounded-full border-2 m-5 p-2">
                  <Image
                    alt=""
                    src={evolucion?.sprite}
                    width={200}
                    height={200}
                  />
                </div>
                <h1 className="text-2xl">
                  {capitalizeFirstLetter(evolucion?.name)}
                </h1>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
