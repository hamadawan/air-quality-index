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
import './../App.css'
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
    color: '#666666',
    marginBottom: '10px',
    fontSize:'24px'
  },
});

const heathConcern = (number) => {
    if ( number <= 50 )
    return 'Good';
    if ( number <= 100 )
    return 'Satisfactory';
    if (number <=200)
    return 'Moderate';
    if (number <=300)
    return 'Poor';
    if (number <=400)
    return 'Very Poor';
    if (number >400)
    return 'Severe';
}

const lastUpdated = ( oldTime ) => {
    let newTime = Date.now()
    let seconds = oldTime ? ((newTime - oldTime)/1000) : 0
    if(seconds < 60 ) return 'few seconds ago'
    let minutes = Math.floor(seconds/60);
    if( minutes < 60 ) return minutes + ' minutes ago'
    let hours = Math.floor(minutes/60)
    if( hours < 24 ) return hours + ' hours ago'
    let days = Math.floor(hours/24)
    if( days < 365 ) return 'About t' + days + ' ago'
    let years = Math.floor(days/365)
    return 'About j' + years + ' ago'
}

export default function AQITable({data}) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" className={classes.title}>
        Air Quality Index Table of Indian Major Cities. 
      </Typography>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>City</StyledTableCell>
            <StyledTableCell align="right">AQI Value</StyledTableCell>
            <StyledTableCell align="right">Heath Concern</StyledTableCell>
            <StyledTableCell align="right">Last Update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(data).map((row) => (
            <StyledTableRow key={row.city}>
              <StyledTableCell component="th" scope="row">
                {row.city}
              </StyledTableCell>
              <StyledTableCell align="right">{ row.aqi.toFixed(2) }</StyledTableCell>
              <StyledTableCell className={heathConcern(row.aqi)} align="right">{ heathConcern( row.aqi ) }</StyledTableCell>
              <StyledTableCell align="right">{ lastUpdated( row.updatedTime ) }</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}