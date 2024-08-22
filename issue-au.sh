#!/bin/bash

set -o allexport
source .env
set +o allexport

npx ts-node gen-au.ts
