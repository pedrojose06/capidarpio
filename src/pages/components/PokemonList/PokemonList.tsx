import { Card } from "@/components/ui/card";
import api from "@/pages/services/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IPokemon {
  id: number;
  name: string;
  url: string;
}

const fetchPokemonList = async () => {
    const response = await api.get('pokemon-form?limit=9');
    return response.data.results;
};

const fetchPokemonImage = async (pokeURL: string): Promise<any> => {
  const response = await api.get(`${pokeURL}`);
  return response.data;
};

const PokemonList = () => {
    const router = useRouter();
    const [pokemon, setPokemon] = useState<IPokemon[]>();
  
    useEffect(() => {
      const getPokemonName = async () => {
        let list: IPokemon[] = [];
        const pokeList = await fetchPokemonList();
        pokeList.map(async (poke: IPokemon) => {
          const pokeInfo = await fetchPokemonImage(poke.url);
          list = [...list, { id: pokeInfo.id, name: pokeInfo.pokemon.name, url: pokeInfo.sprites.front_default }];
          setPokemon(list.sort((a, b) => a.id - b.id));
        });
      };
  
      getPokemonName();
    }, []);
  
    return (
      <div className="flex gap-2 p-3 flex-wrap w-full justify-around">
         {pokemon?.map((poke: IPokemon) => (
          <div key={poke.id} className="h-72 w-52" onClick={() =>     router.push(`/details/${poke.id}`)}>
            <Card className="h-full w-full flex flex-col justify-around">
              <img src={poke.url} alt={poke.name} />
              <h1 className="font-bold text-center">#{poke.id} {poke.name.toUpperCase()}</h1>
            </Card>
          </div>
        ))}
      </div>
    );
    }
    export default PokemonList;