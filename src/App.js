
import './App.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useState, useEffect } from "react";

import axios from 'axios';
import Typetable from './components/Typetable';

const types = ['normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy']

const tc=
[
    [1,1,1,1,1,1,1,1,1,1,1,1,0.5,0,1,1,0.5,1], //normal
    [1,0.5,0.5,2,1,2,1,1,1,1,1,2,0.5,1,0.5,1,2,1], //fire
    [1,2,0.5,0.5,1,1,1,1,2,1,1,1,2,1,0.5,1,1,1], //water
    [1,0.5,2,0.5,1,1,1,0.5,2,0.5,1,0.5,2,1,0.5,1,0.5,1], //grass
    [1,1,2,0.5,0.5,1,1,1,0,2,1,1,1,1,0.5,1,1,1], //electric
    [1,0.5,0.5,2,1,0.5,1,1,2,2,1,1,1,1,2,1,0.5,1], //ice
    [2,1,1,1,1,2,1,0.5,1,0.5,0.5,0.5,2,0,1,2,2,0.5], //fighting
    [1,1,1,2,1,1,1,0.5,0.5,1,1,1,0.5,0.5,1,1,0,2], //posion
    [1,2,1,0.5,2,1,1,2,1,0,1,0.5,2,1,1,1,2,1], //ground
    [1,1,1,2,0.5,1,2,1,1,1,1,2,0.5,1,1,1,0.5,1], //flying
    [1,1,1,1,1,1,2,2,1,1,0.5,1,1,1,1,0,0.5,1], //psychic
    [1,0.5,1,2,1,1,0.5,0.5,1,0.5,2,1,1,0.5,1,2,0.5,0.5], //bug
    [1,2,1,1,1,2,0.5,1,0.5,2,1,2,1,1,1,1,0.5,1], //rock
    [0,1,1,1,1,1,1,1,1,1,2,1,1,2,1,0.5,1,1], //ghost
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,0.5,0], //dragon
    [1,1,1,1,1,1,0.5,1,1,1,2,1,1,2,1,0.5,1,0.5], //dark
    [1,0.5,0.5,1,0.5,2,1,1,1,1,1,1,2,1,1,1,0.5,2], //steel
    [1,0.5,1,1,1,1,2,0.5,1,1,1,1,1,1,2,2,0.5,1], //fairy
]

function calcMultipliers(deftype1, deftype2) {
  let multipliers = [];
  if (deftype2){
    for (let i=0; i<types.length; i++) {
      multipliers.push(tc[i][types.indexOf(deftype1)]*tc[i][types.indexOf(deftype2)])
    }
  } else {
  for (let i=0; i<types.length; i++) {
      multipliers.push(tc[i][types.indexOf(deftype1)])
  }
}
return multipliers;
}

function App() {
  const [pokemon, setPokemon] = useState({});
  const [multipliers1, setMultipliers1] = useState([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
  const [pokedex, setPokedex] = useState([]);

  const rows = [
    {'type':'normal', 'colour': 'lightgrey', 'dmg':multipliers1[0]}
    ,{'type':'fire', 'colour': 'orange', 'dmg':multipliers1[1]}
    ,{'type':'water', 'colour': 'lightblue', 'dmg':multipliers1[2]}
    ,{'type':'grass','colour': 'lightgreen',  'dmg':multipliers1[3]}
    ,{'type':'electric', 'colour': 'yellow', 'dmg':multipliers1[4]}
    ,{'type':'ice', 'colour': 'cyan', 'dmg':multipliers1[5]}
    ,{'type':'fighting', 'colour': 'brown', 'dmg':multipliers1[6]}
    ,{'type':'poison', 'colour': 'purple', 'dmg':multipliers1[7]}
    ,{'type':'ground', 'colour': 'beige', 'dmg':multipliers1[8]}
    ,{'type':'flying', 'colour': 'khaki', 'dmg':multipliers1[9]}
    ,{'type':'psychic', 'colour': 'hotpink', 'dmg':multipliers1[10]}
    ,{'type':'bug', 'colour': 'olive', 'dmg':multipliers1[11]}
    ,{'type':'rock', 'colour': 'indianred', 'dmg':multipliers1[12]}
    ,{'type':'ghost', 'colour': 'indigo', 'dmg':multipliers1[13]}
    ,{'type':'dragon', 'colour': 'gold', 'dmg':multipliers1[14]}
    ,{'type':'dark', 'colour': 'grey', 'dmg':multipliers1[15]}
    ,{'type':'steel', 'colour': 'lightgrey', 'dmg':multipliers1[16]}
    ,{'type':'fairy', 'colour': 'pink', 'dmg':multipliers1[17]}
  ]

  function handleChange(event, value){
    if (value){
    axios.get('https://pokeapi.co/api/v2/pokemon/' + value)
    .then((response)=>{
      setPokemon(response.data)
      if (response.data.types[1]){
        setMultipliers1(calcMultipliers(response.data.types[0].type.name,response.data.types[1].type.name))
      } else {
        setMultipliers1(calcMultipliers(response.data.types[0].type.name))
      }
    })

  }
}

  useEffect(()=>{
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=1281')
    .then((response)=>{
      setPokedex(response.data.results.map((pokemon)=>{return pokemon['name']}))
    })}
    , [])

  return (
    <div className="App">
        <p>
          Nuzlocke Helper
        </p>


      <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={pokedex}
  sx={{ width: 300 }}
  onChange={handleChange}
  renderInput={(params) => <TextField {...params} label="Pokemon" />}
/>

{!pokemon.name ? <p>Pick a pokemon</p> : 
  <><p>
          {pokemon.name} is {pokemon.types[0].type.name}
          {pokemon.types[1] && '/'+pokemon.types[1].type.name}
        </p>  

<Typetable rows={rows}/>
    </>
}

    </div>
  );
}

export default App;
