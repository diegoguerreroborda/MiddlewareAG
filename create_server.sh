#!/bin/bash

docker run -dti --name containerDB$1 -p $1:3000 serverDb