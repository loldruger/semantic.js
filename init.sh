curl -L https://github.com/mishoo/UglifyJS/archive/refs/tags/v3.19.3.tar.gz -o uglify-js.tar.gz
mkdir -p dependencies/uglify-js
tar -xzf uglify-js.tar.gz -C dependencies/uglify-js --strip-components=1
rm uglify-js.tar.gz