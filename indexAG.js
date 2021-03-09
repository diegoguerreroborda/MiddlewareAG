const express = require('express');
const axios = require('axios');
const cors = require('cors');
const shell = require('shelljs');
const bodyParser = require('body-parser');
var  cron  = require('node-cron');
const port = 3050;
const portMS = 3000;

const app = express()
app.use(cors())
app.use(bodyParser.json())
//shell.exec("sh heartbeat.sh 3000")
let monitoring = "Nada...";

app.get('/students', (req, res) => {
    console.log(req.query);
    monitoring = `Estudiante_agregado***Nombre:-${req.query.surname}-${req.query.lastname}-Celular:-${req.query.phone}**MainServer:-http://localhost:${portMS}`
    shell.exec(`./monitoring.sh ${monitoring}`)
    axios({
        method: 'post',
        url: `http://localhost:${portMS}/new_student`,
        data: req.query
    }).then(response => {
        console.log(response.data);
        res.send(response.data);
    }).catch(err => {
        res.sendStatus(404)
        console.log(err);
    });
})

var taskBackup = cron.schedule('*/5 * * * * *', () => {
    axios.get(`http://localhost:${portMS}/students_backup`)
    .then(function (response) {
        //Hace una petición GET al servidor
        console.log("Backup hecho")
        monitoring = 'Backup_realizado';
        //shell.exec("sh monitoring.sh")
        shell.exec(`./monitoring.sh ${monitoring}`)
        monitoring = "";
    }).catch(function (error) {
        console.log("error")
    });
});

taskBackup.start();

app.get('/monitoring', (req, res) => {
    res.send(monitoring);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})