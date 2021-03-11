#!/bin/bash
echo "Deteniendo contenedor..."
docker stop servernew$1
echo "Eliminando contenedor..."
docker rm servernew$1
var=$1
var=$((var + 1))
cd ..
echo "pwd"
cd MainServerAG
echo "Creando nuevo contenedor..."
echo pwd
export PORT=$var
docker-compose up -d
echo "Recuperando base de datos..."
docker network connect my-custom-net servernew$PORT
#docker network connect my-custom-net backupContainer
curl "localhost:${PORT}/recovery_db"
echo "Nuevo servidor corriendo en... http://localhost:${PORT}/"