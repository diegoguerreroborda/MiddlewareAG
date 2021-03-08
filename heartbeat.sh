#!/bin/bash
i=0 #inicio
f=1 #fin
until [ $f -lt $i ]
do
sleep 3
	variable=$(curl -s -w '%{time_total}\n' -o /dev/null localhost:3000/);
	echo "time response: $variable";
	if [[ $variable > 5 ]]
	then
    	echo 'lento'
		
	else
   		echo 'rapido'
	fi
done