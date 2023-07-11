import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import clsx from "clsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
          console.log(evolucion);
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

  const values = pokemon?.stats?.map((estadistica) => {
    return estadistica.base_stat;
  });
  const labels = pokemon?.stats?.map((estadistica) => {
    return capitalizeFirstLetter(estadistica.stat.name);
  });

  const getColor = (color) => {
    switch (color) {
      case "black":
        return "#00000050";
      case "blue":
        return "#0000FF50";
      case "brown":
        return "#A52A2A50";
      case "gray":
        return "#80808050";
      case "green":
        return "#00800050";
      case "pink":
        return "#FFC0CB50";
      case "purple":
        return "#80008050";
      case "red":
        return "#FF000050";
      case "white":
        return "#FFFFFF50";
      case "yellow":
        return "#FFFF0050";
      default:
        return "#00000050";
    }
  };
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Puntos base",
        data: values,
        backgroundColor: [`${getColor(specieInfo?.color?.name)}`],
        borderColor: ["rgb(255, 99, 132)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-screen w-screen overflow-y-auto bg-[#EBF5F0] text-black p-20 px-5 lg:px-20">
      <div className="card bg-white shadow-2xl flex flex-col lg:flex-row justify-center my-10 p-5 border border-gray-700">
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
                  <div key={tipo} className="badge badge-outline mr-2">
                    {capitalizeFirstLetter(tipo.type.name)}
                  </div>
                ))}
            </div>
            <div className="flex items-center">
              <h2 className="card-title mr-2">Habilidades:</h2>
              {pokemon?.abilities &&
                pokemon?.abilities?.map((habilidad) => (
                  <div key={habilidad} className="badge badge-outline mr-2">
                    {capitalizeFirstLetter(habilidad.ability.name)}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="card bg-white shadow-2xl my-5 p-10 border border-gray-700">
        <h1 className="text-3xl mb-5 text-center">Estadísticas</h1>
        <Bar data={data} />
      </div>
      <div className="card bg-white shadow-2xl my-5 p-10 border border-gray-700">
        <h1 className="text-3xl mb-5 text-center">Evoluciones</h1>
        <div className="flex flex-wrap justify-center">
          {evoluciones?.length &&
            evoluciones?.map((evolucion, index) => (
              <div className="text-center" key={index}>
                <div
                  className={clsx(
                    "border-black rounded-full border-2 m-10 mb-2 p-5 shadow-2xl",
                    `hover:bg-${evolucion?.color?.name}-200`
                  )}
                >
                  <Image
                    alt=""
                    src={evolucion?.sprite}
                    width={200}
                    height={200}
                    className="hover:w-60 hover:h-60"
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
