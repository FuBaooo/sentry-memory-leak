#!/bin/bash

count=0

while true
do
    count=$((count+1))
    echo "Request number: $count"
    curl -s http://localhost:3000/test > /dev/null
done
