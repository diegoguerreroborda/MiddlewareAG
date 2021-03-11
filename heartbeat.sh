#!/bin/bash
sp=$1
i=0 #inicio
f=1 #fin
var3=100
until [ $f -lt $i ]
do
sleep 3
	variable=$(curl -s -w '%{time_total}\n' -o /dev/null localhost:$sp/);
	let variable1=$variable/$var3;
	echo "time response: $variable1";
	if [[ $(($variable1 > 5)) == 0 ]]
	then
    	echo rapido
	else
    	echo lento
		docker stop servernew
		#docker stop mymongodatabase
		#docker rm containerDB$sp
		#docker run -dti --name containerDB$sp -p $sp:3000 servers2
		#PESOS1, 4000(CONTENEDOR ACTUAL), PESOS2, 4001 (NUEVO CONTENEDOR)
		export PORT=$sp+1
		docker compose up -d
		docker network connect my-custom-net nginx2
	fi
done