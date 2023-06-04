import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Typetable({rows}){

      function dmgColor(dmg){
        if (dmg == 0) return 'black';
        else if (dmg == 0.25) return 'red';
        else if (dmg == 0.5) return 'orange';
        else if (dmg == 1) return 'white';
        else if (dmg == 2) return 'green';
        else return 'darkgreen';
      }

      
return (
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
)
}

export default Typetable;