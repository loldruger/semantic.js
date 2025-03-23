#!/bin/bash

# Check if minify exists, if not install it
if [ ! -f ./dependencies/minify/minify ]; then
    echo "Installing minify..."
    mkdir -p dependencies/minify
    curl -L https://github.com/tdewolff/minify/releases/download/v2.22.3/minify_linux_amd64.tar.gz -o minify.tar.gz
    
    # Check if download was successful
    if [ ! -f minify.tar.gz ]; then
        echo "Failed to download minify"
        exit 1
    fi
    
    # Show the content of the tarball
    echo "Content of the tarball:"
    tar -tvf minify.tar.gz
    
    # Extract without --strip-components
    tar -xzf minify.tar.gz -C dependencies/minify
    
    # Find the minify binary and move it to the expected location
    find dependencies/minify -type f -name "minify" -exec chmod +x {} \;
    find dependencies/minify -type f -name "minify" -exec mv {} dependencies/minify/ \;
    
    rm minify.tar.gz
    
    # Verify minify exists
    if [ ! -f ./dependencies/minify/minify ]; then
        echo "minify was not installed correctly, searching for it..."
        find dependencies -type f -name "minify" -o -name "minify*"
        ls -la dependencies/minify/
        exit 1
    fi
    
    echo "minify installed successfully"
fi

# Create dist directory
mkdir -p dist

# Check if src directory exists
if [ ! -d src ]; then
    echo "Error: src directory not found. Make sure you are running the script from the project root."
    exit 1
fi

# 개별 파일 최소화 (강화된 압축 옵션 사용)
echo "Minifying individual files..."
for file in $(find src -name '*.js' -not -name '*.test.js'); do
    echo "Processing $file"
    target_file="dist/$file"
    mkdir -p "$(dirname "$target_file")"
    
    # Try to find and use the minify executable
    minify_bin=$(find dependencies -type f -name "minify" -executable | head -1)
    
    if [ -z "$minify_bin" ]; then
        echo "Error: minify executable not found"
        exit 1
    fi
    
    echo "Using minify at: $minify_bin"
    # 더 강력한 압축 옵션 추가
    $minify_bin --js.keep-var-names=false --js.terminal=false -o "$target_file" "$file"
done

echo "Creating minified bundle..."
cat $(find src -name '*.js' -not -name '*.test.js') > dist/semantic.js

# Find and use the minify executable with enhanced options
minify_bin=$(find dependencies -type f -name "minify" -executable | head -1)
$minify_bin --js.keep-var-names=false --js.terminal=false -o dist/semantic.min.js dist/semantic.js

# 추가 gzip 압축 생성
echo "Creating gzipped version..."
gzip -9 -c dist/semantic.min.js > dist/semantic.min.js.gz

# 파일 크기 정보 표시
echo "File size comparison:"
ls -lh dist/semantic.min.js dist/semantic.min.js.gz

rm dist/semantic.js

echo "Build complete!"