import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

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

export default function BarChart({ data, }) {

    let dataArray = Object.values(data).map( record => {
        return { name: record.city, y:Number(record.aqi.toFixed(2)), color: numberToColor(record.aqi) }
    })
    let cities = Object.keys(data)

    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Air Quality Index of Indian Major Cities, 2021',
            color: '#666666'
        },
        subtitle: {
            text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            title: {
                text: 'India Major Cities'
            },
            categories: [...cities]
        },
        yAxis: {
            title: {
                text: 'Air Quality Index Value'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },
    
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b><br/>'
        },
    
        series: [
            {
                name: "AQI",
                colorByPoint: true,
                data: [...dataArray]
            }
        ]
    }

  return (
    <div>
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    </div>
  );
}