#!/bin/bash
sp=$1
i=0 #inicio
f=1 #fin
until [ $f -lt $i ]
do
sleep 3
	variable=$(curl -s -w '%{time_total}\n' -o /dev/null localhost:$sp/);
	echo "time response: $variable";
	if [ $variable > 5 ]
	then
    	echo 'Server lento'
		docker stop containerDB$sp
		docker rm containerDB$sp
		docker run -dti --name containerDB$sp -p $sp:3000 servers2
#PESOS1, 4000(CONTENEDOR ACTUAL), PESOS2, 4001 (NUEVO CONTENEDOR)
		i++	
	else
   		echo 'Server rapido'
	fi
done