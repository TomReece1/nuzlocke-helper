import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Typetable({ multipliers }) {
  
  function dmgColor(dmg) {
    if (dmg == 0) return "black";
    else if (dmg == 0.25) return "red";
    else if (dmg == 0.5) return "orange";
    else if (dmg == 1) return "white";
    else if (dmg == 2) return "green";
    else return "darkgreen";
  }

  const rows = [
    { type: "normal", colour: "lightgrey", dmg: multipliers[0] },
    { type: "fire", colour: "orange", dmg: multipliers[1] },
    { type: "water", colour: "lightblue", dmg: multipliers[2] },
    { type: "grass", colour: "lightgreen", dmg: multipliers[3] },
    { type: "electric", colour: "yellow", dmg: multipliers[4] },
    { type: "ice", colour: "cyan", dmg: multipliers[5] },
    { type: "fighting", colour: "brown", dmg: multipliers[6] },
    { type: "poison", colour: "purple", dmg: multipliers[7] },
    { type: "ground", colour: "beige", dmg: multipliers[8] },
    { type: "flying", colour: "khaki", dmg: multipliers[9] },
    { type: "psychic", colour: "hotpink", dmg: multipliers[10] },
    { type: "bug", colour: "olive", dmg: multipliers[11] },
    { type: "rock", colour: "indianred", dmg: multipliers[12] },
    { type: "ghost", colour: "indigo", dmg: multipliers[13] },
    { type: "dragon", colour: "gold", dmg: multipliers[14] },
    { type: "dark", colour: "grey", dmg: multipliers[15] },
    { type: "steel", colour: "lightgrey", dmg: multipliers[16] },
    { type: "fairy", colour: "pink", dmg: multipliers[17] },
  ];

  return (
    <TableContainer sx={{ width: 180 }} component={Paper}>
      <Table aria-label="simple table">
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
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{ backgroundColor: row.colour }}
              >
                {row.type}
              </TableCell>
              <TableCell
                align="right"
                sx={{ backgroundColor: dmgColor(row.dmg) }}
              >
                {row.dmg}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Typetable;
