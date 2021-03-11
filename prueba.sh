#!/bin/bash
if [[ $(($1 > 5)) == 0 ]]
then
    echo menor
else
    echo mayor
fi