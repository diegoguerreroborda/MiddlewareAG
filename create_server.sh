#!/bin/bash

docker rm containerDB
docker run -dti --name containerDB -p 4000:3000 serverDb
