
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
  const [multipliers, setMultipliers] = useState([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
  const [pokedex, setPokedex] = useState([]);

  const rows = [
    {'type':'normal', 'colour': 'lightgrey', 'dmg':multipliers[0]}
    ,{'type':'fire', 'colour': 'orange', 'dmg':multipliers[1]}
    ,{'type':'water', 'colour': 'lightblue', 'dmg':multipliers[2]}
    ,{'type':'grass','colour': 'lightgreen',  'dmg':multipliers[3]}
    ,{'type':'electric', 'colour': 'yellow', 'dmg':multipliers[4]}
    ,{'type':'ice', 'colour': 'cyan', 'dmg':multipliers[5]}
    ,{'type':'fighting', 'colour': 'brown', 'dmg':multipliers[6]}
    ,{'type':'poison', 'colour': 'purple', 'dmg':multipliers[7]}
    ,{'type':'ground', 'colour': 'beige', 'dmg':multipliers[8]}
    ,{'type':'flying', 'colour': 'khaki', 'dmg':multipliers[9]}
    ,{'type':'psychic', 'colour': 'hotpink', 'dmg':multipliers[10]}
    ,{'type':'bug', 'colour': 'olive', 'dmg':multipliers[11]}
    ,{'type':'rock', 'colour': 'indianred', 'dmg':multipliers[12]}
    ,{'type':'ghost', 'colour': 'indigo', 'dmg':multipliers[13]}
    ,{'type':'dragon', 'colour': 'gold', 'dmg':multipliers[14]}
    ,{'type':'dark', 'colour': 'grey', 'dmg':multipliers[15]}
    ,{'type':'steel', 'colour': 'lightgrey', 'dmg':multipliers[16]}
    ,{'type':'fairy', 'colour': 'pink', 'dmg':multipliers[17]}
  ]

  function dmgColor(dmg){
    if (dmg == 0) return 'black';
    else if (dmg == 0.25) return 'red';
    else if (dmg == 0.5) return 'orange';
    else if (dmg == 1) return 'white';
    else if (dmg == 2) return 'green';
    else return 'darkgreen';
  }

  function handleChange(event, value){
    if (value){
    axios.get('https://pokeapi.co/api/v2/pokemon/' + value)
    .then((response)=>{
      setPokemon(response.data)
      if (response.data.types[1]){
        setMultipliers(calcMultipliers(response.data.types[0].type.name,response.data.types[1].type.name))
      } else {
        setMultipliers(calcMultipliers(response.data.types[0].type.name))
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


<TableContainer sx={{ width: 300, }} component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell align="right">dmg</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.type}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{backgroundColor: row.colour}}>
                {row.type}
              </TableCell>
              <TableCell align="right" sx={{backgroundColor: dmgColor(row.dmg)}}>{row.dmg}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
}

    </div>
  );
}

export default App;
