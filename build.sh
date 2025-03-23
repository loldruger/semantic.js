#!/bin/bash

[ ! -f ./dependencies/minify/minify ] && {
    mkdir -p dependencies/minify
    curl -sL https://github.com/tdewolff/minify/releases/download/v2.22.3/minify_linux_amd64.tar.gz -o minify.tar.gz
    tar -xzf minify.tar.gz -C dependencies/minify
    find dependencies/minify -type f -name "minify" -exec chmod +x {} \;
    find dependencies/minify -type f -name "minify" -exec mv {} dependencies/minify/ \;
    rm minify.tar.gz
}

mkdir -p dist
[ ! -d src ] && { echo "Error: src directory not found"; exit 1; }

minify_bin=$(find dependencies -type f -name "minify" -executable | head -1)
[ -z "$minify_bin" ] && { echo "Error: minify not found"; exit 1; }

for file in $(find src -name '*.js' -not -name '*.test.js'); do
    mkdir -p "dist/$(dirname "$file")"
    $minify_bin --js.keep-var-names=false --js.terminal=false -o "dist/$file" "$file"
done

cat $(find src -name '*.js' -not -name '*.test.js') > dist/semantic.js
$minify_bin --js.keep-var-names=false --js.terminal=false -o dist/semantic.min.js dist/semantic.js
ls -lh dist/semantic.min.js

rm dist/semantic.js