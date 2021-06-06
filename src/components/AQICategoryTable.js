import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import './../AQICategory.css'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#777',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  title: {
    marginBottom: '10px',
    color: '#666666',
    fontSize:'24px'
  },
});

const rows = [
  {number:'0-50',category:'Good'},
  {number:'50-100',category:'Satisfactory'},
  {number:'100-200',category:'Moderate'},
  {number:'200-300',category:'Poor'},
  {number:'300-400',category:'Very Poor'},
  {number:'400-500',category:'Severe'},
]

export default function AQICategoryTable({data}) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" className={classes.title}>
        Air Quality Index Category Table   
      </Typography>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>AQI</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow className={"AQICategory"} key={row.number}>
              <StyledTableCell className={row.category} style={{maxWidth:'30px'}} component="th" scope="row">
                {row.number}
              </StyledTableCell>
              <StyledTableCell className={row.category} style={{maxWidth:'30px'}} component="th" scope="row">
                {row.category}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}