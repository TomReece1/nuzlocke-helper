import "./App.css";
import Column from "./components/column";
import { useState } from "react";
import Matchup from "./components/matchup";

function App() {
  const [pokemon1, setPokemon1] = useState({});
  const [pokemon2, setPokemon2] = useState({});

  return (
    <div className="App">
      <p>Nuzlocke Helper</p>
      {(pokemon1.name && pokemon2.name) && <Matchup pokemon1={pokemon1} pokemon2={pokemon2}/>}
      <div className="flex-container">
      <Column pokemon={pokemon1} setPokemon={setPokemon1}/>
      <Column pokemon={pokemon2} setPokemon={setPokemon2}/>
      </div>
    </div>
  );
}

export default App;
