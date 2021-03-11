const express = require('express');
const axios = require('axios');
const cors = require('cors');
const shell = require('shelljs');
const bodyParser = require('body-parser');
var  cron  = require('node-cron');
const port = 3050;
let portMS = 4004;

const app = express()
app.use(cors())
app.use(bodyParser.json())
//shell.exec("sh heartbeat.sh 3000")
let monitoring = "Nada...";

var taskBackup = cron.schedule('*/5 * * * * *', () => {
    axios.get(`http://localhost:${portMS}/students_backup`)
    .then(function (response) {
        //Hace una petición GET al servidor
        console.log(response.data)
        monitoring = `Backup_realizado:`;
        monitoring += `desde:http://localhost:${portMS}/**a:http://localhost:4320/`
        shell.exec(`./monitoring.sh ${monitoring}`)
        monitoring = "";
    }).catch(function (error) {
        console.log("error")
        monitoring = 'Error_al_hacer_backup:_';
        monitoring += 'Error404:Not_found';
        shell.exec(`./monitoring.sh ${monitoring}`)
    });
});
//taskBackup.start();

var taskheartbeat = cron.schedule('*/10 * * * * *', () => {
    axios.get(`http://localhost:${portMS}/`, {timeout: 5000})
    .then(function (response) {
        //Hace una petición GET al servidor
        console.log("rapido")
        monitoring = 'Estatusdel_servidor:200'
        monitoring += `http://localhost:${portMS}`;
        shell.exec(`./monitoring.sh ${monitoring}`)
        console.log(response.data)
    }).catch(function (error) {
        taskheartbeat.stop();
        console.log("lento")
        let current = portMS;
        portMS++;
        shell.exec(`sh create_server.sh ${current}`)
        monitoring = 'Servidor_lento...';
        monitoring += 'Creando_nuevo_contenedor...';
        monitoring += `http://localhost:${portMS}`;
        shell.exec(`./monitoring.sh ${monitoring}`)
        
        taskheartbeat.stop();
    });
});

taskheartbeat.start();

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

app.get('/monitoring', (req, res) => {
    res.send(monitoring);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})