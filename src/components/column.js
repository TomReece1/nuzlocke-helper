import { useState } from "react";
import axios from "axios";
import Dropdown from "./dropdown";
import { calcMultipliers } from "./brain";
import Typetable from "./typetable";

function Column({pokemon, setPokemon}) {

  const [multipliers, setMultipliers] = useState([]);

  function handleChange(event, value) {
    if (value) {
      axios
        .get("https://pokeapi.co/api/v2/pokemon/" + value)
        .then((response) => {
          setPokemon(response.data);
          if (response.data.types[1]) {
            setMultipliers(
              calcMultipliers(
                response.data.types[0].type.name,
                response.data.types[1].type.name
              )
            );
          } else {
            setMultipliers(calcMultipliers(response.data.types[0].type.name));
          }
        });
    }
  }

  return (
    <div className="flex-container-col">
      <Dropdown handleChange={handleChange} />

      {!pokemon.name ? (
        <p>Pick a pokemon</p>
      ) : (
        <>
          <p>
            {pokemon.name} is {pokemon.types[0].type.name}
            {pokemon.types[1] && "/" + pokemon.types[1].type.name}
          </p>
          <p>
            and takes damage like so:
          </p>

          <Typetable multipliers={multipliers} />
        </>
      )}
    </div>
  );
}

export default Column;
