import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import axios from "axios";
function Dropdown({ handleChange }) {
  const [pokedex, setPokedex] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=1281")
      .then((response) => {
        setPokedex(
          response.data.results.map((pokemon) => {
            return pokemon["name"];
          })
        );
      });
  }, []);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={pokedex}
      sx={{ width: 300 }}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} label="Pokemon" />}
    />
  );
}

export default Dropdown;
