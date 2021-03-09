const express = require('express');
const axios = require('axios');
const cors = require('cors');
const shell = require('shelljs');
const bodyParser = require('body-parser');
const port = 3050;
const portMS = 3000;

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/', async(req, res) => {
    //Llega del cliente
    await axios.get(`http://localhost:${portMS}/`)
    .then(function (response) {
        //Hace una petición GET al servidor
        console.log(response.data)
        res.sendStatus(200);
    }).catch(function (error) {
        res.sendStatus(404);
    });
});

app.get('/students', (req, res) =>{ 
    console.log(req.query);
    axios({
        method: 'post',
        url : `http://localhost:${portMS}/new_student`,
        data: req.query
      }).then(response => {
          console.log(response.data);
          res.send(response.data);
      }).catch(err => {
          res.sendStatus(404)
          console.log(err);
      }); 
})
    
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})