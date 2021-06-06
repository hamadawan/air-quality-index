import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const numberToColor = (number) => {
    if ( number <= 50 )
    return '#53a849';
    if ( number <= 100 )
    return '#a2c751';
    if (number <=200)
    return '#fef033 ';
    if (number <=300)
    return '#f39c32';
    if (number <=400)
    return '#e93f32';
    if (number >400)
    return '#b02e25';
}

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    title: {
        marginBottom: '10px',
        color: '#666666',
        fontSize:'24px'
    },
}));

export default function BarChart({ allData }) {

    // let dataArray = Object.values(allData).map( record => {
    //     return { name: record.city, y:Number(record.aqi.toFixed(2)), color: numberToColor(record.aqi) }
    // })

    const classes = useStyles();    
    const [city, setCity] = React.useState('');
    const [city2, setCity2] = React.useState('');
    let cities = Object.keys(allData)

    const options = {
        title: {
            text: 'Live Air Quality Index',
            color: '#666666'
        },
        yAxis: {
            title: {
                text: 'Air Quality Index Value'
            }
        },
        series: [
          { name: city, data: allData[city]? allData[city]:[]},
          { name: city2, data: allData[city2]? allData[city2]:[]}
        ]   
    }
    const handleChange = (event) => {
        setCity(event.target.value);  
    };
    const handleChange2 = (event) => {
        setCity2(event.target.value);  
    };
  return (
    <div>
        <Typography variant="h6" className={classes.title}>
            Compare Cities AQI   
        </Typography>
        <FormControl variant="filled" className={classes.formControl}>
         <InputLabel id="demo-simple-select-filled-label">Select City</InputLabel>
         <Select
          value={city}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
              cities.map( city => {
                  return <MenuItem key={city} value={city}>{city}</MenuItem>
              })
          }
          </Select>
        </FormControl>
        <FormControl variant="filled" className={classes.formControl}>
         <InputLabel id="demo-simple-select-filled-label">Select City</InputLabel>
         <Select
          value={city2}
          onChange={handleChange2}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
              cities.map( city => {
                  return <MenuItem key={city} value={city}>{city}</MenuItem>
              })
          }
          </Select>
        </FormControl>
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    </div>
  );
}