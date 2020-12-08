rm -rf ./build/dist
$(npm bin)/tsc --emitDeclarationOnly
$(npm bin)/rollup -c
cp README.md package.json ./build/dist

npm publish ./build/dist
