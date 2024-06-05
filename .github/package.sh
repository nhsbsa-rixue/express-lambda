#!/bin/bash
set -e

# Install dependencies
npm install

# # Build the project
# npm run build

# Zip the necessary files
zip -r lambda.zip ../src/ ../node_modules/