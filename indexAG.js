const express = require('express');
const axios = require('axios');
const cors = require('cors');
const shell = require('shelljs');
const port = 3050;
const portMS = 4321;

const app = express()
app.use(cors())

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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})