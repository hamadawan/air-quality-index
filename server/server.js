const cors = require("cors");
const path = require('path');
const express = require('express');
const app = express();

const publicPath = path.join(__dirname, '..', 'build');

const { DB, PORT } = require("./config");
const port = PORT || 5000;
app.use(express.static(publicPath));


app.use(cors());

app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});

const startApp = async () => {

   app.listen(port, () => {
      console.log('Server is up!',port,publicPath);
   });
   
};
startApp();
