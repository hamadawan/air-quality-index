import { Paper } from '@material-ui/core';
import React from 'react' 
import AQITable from './components/AQITable';
import AQICategoryTable from './components/AQICategoryTable';
import BarChart from './components/BarChart';
import Header from './components/Header'
import Footer from './components/Footer'
import Grid from '@material-ui/core/Grid';

class AQIApp extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          ws: null,
          data: {}
      };
  }

  componentDidMount() {
      this.wsConnect();
  }

  // Initial timeout duration as a class variable
  timeout = 250; 

  /**
   * @function wsConnect
  */
  wsConnect = () => {
      var ws = new WebSocket("ws://city-ws.herokuapp.com"); 
      let that = this; 
      var connectInterval;

      // websocket onopen event listener
      ws.onopen = () => {
          this.setState({ ws: ws });
          that.timeout = 250; 
          clearTimeout(connectInterval); 
      };

      // websocket onclose event listener
      ws.onclose = e => {
          that.timeout = that.timeout + that.timeout; 
          connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); 
      };

      // websocket onerror event listener
      ws.onerror = err => {
          console.error( "Socket encountered error: ", err.message, "Closing socket");
          ws.close();
      };

      ws.onmessage = (event) => {
        let response = JSON.parse(event.data)
        let newRecord = {}
        let now = Date.now()
        response.map( record => {
            newRecord[record.city] = {...record, updatedTime: now}
        })
        this.setState({data: {...this.state.data, ...newRecord}})
      }
  };

  check = () => {
      const { ws } = this.state;
      if (!ws || ws.readyState == WebSocket.CLOSED) this.wsConnect(); //check if websocket instance is closed, if so call `connect` function.
  };
  

  render() {
    return (
        <>
            <Header/>
            <Paper style={{margin:'20px'}}>
                <BarChart data={this.state.data} />
            </Paper>
            <Grid container>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <Paper style={{margin:'20px'}}>
                        <AQICategoryTable data={this.state.data} />
                    </Paper>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={12}>
                    <Paper style={{margin:'20px'}}>
                        <AQITable data={this.state.data} />
                    </Paper>
                </Grid>
            </Grid>
            <Footer /> 
        </>
    );
  }
}

export default AQIApp