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
    console.log(specieInfo);
    if (specieInfo?.evolution_chain) {
      const url = specieInfo.evolution_chain.url;
      fetch(`${url}`)
        .then((res) => res.json())
        .then(async (data) => {
          console.log(data);
          const evolucion = await getEvolucion(data.chain);
          setEvoluciones(evolucion);
        })
        .catch((error) => {
          console.error("Error fetching evolution chain:", error);
        });
    }
  }, [specieInfo]);

  const getSprite = (url) => {
    console.log(url);
    return new Promise((resolve, reject) => {
      const id = url.split("/")[6];
      console.log(id);
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
    console.log(evolucion);
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
        console.log(evolucion);
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

  return (
    <div className="h-screen w-screen overflow-y-auto bg-white text-black p-36">
      {<h1 className="text-3xl">{pokemon.name}</h1>}
      <div className="flex flex-row">
        <Image
          width={350}
          height={200}
          src={pokemon.sprites?.other?.["official-artwork"]?.front_default}
          alt={pokemon.name}
        />
        <div className="text-xl bg-blue-400 m-10 p-20">
          <p>Altura: {pokemon.height}</p>
          <p>Peso: {pokemon.weight}</p>
          <p>
            Tipo:{" "}
            {pokemon?.types?.map((tipo) => (
              <span className="mr-2" key={tipo.type.name}>
                {tipo.type.name}
              </span>
            ))}
          </p>
          <p>
            Habilidades:{" "}
            {pokemon?.abilities?.map((habilidad) => (
              <span className="mr-2" key={habilidad.ability.name}>
                {habilidad.ability.name}
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className="bg-gray-300 w-1/2">
        <h1 className="text-2xl">Estadísticas</h1>
      </div>
      <div className="flex flex-row">
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
              <h1 className="text-2xl">{evolucion?.name}</h1>
            </div>
          ))}
      </div>
    </div>
  );
}
