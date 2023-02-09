#!/bin/sh
if [ -z "${TOKEN}" ]; then
    echo "You need to set the TOKEN env var"
    return
fi

yarn start