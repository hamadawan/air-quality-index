import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: '#fff'
  },
  title: {
    flexGrow: 1,
    color: '#666666',
    textAlign:'center',
    margin:'20px'
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Typography variant="h6" className={classes.title}>
           Air Quality Statistics &copy; 2021  
        </Typography>
    </div>
  );
}