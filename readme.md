# #What is Semantic.js

Semantic.js introduces just a pure Javascript but Rustified. Which means it contains utilizable types like `Option<T>`, `Result<T, E>`, `Tagged Union` or also mocked `struct` etc, fully documented by `Jsdoc`. This indicates that this project is entirely typesafe!

Currently this project is in `WIP` (Work in process).

## #Develop Environment

I'm using `vscode` as an editor with `@ts-check` option enabled and `jsdoc` documentation, `firefox` browser as a javascript runtime, `WSL2 ubuntu distro` as an Operating System(?).

Also some vscode extensions like `Debugger for Firefox` by Firefox DevTools, `Live Preview` by Microsoft.

If you want to use another browser like `chrome` or `msedge`, you can edit the `launch.json` in `.vscode` directory.

## #Debug the project

Press F5 to debug project.

## #How to Compile?

This project has been worked only on modern web browser environment like `firefox`. so package managers like `npm` is not needed.

### #to Distribution Ready

Before doing this process, you should execute a shell script named `init.sh` in root of proect.

After `init.sh`, to make this project distribution ready, Uglify the entire project with uglify-js:

> Ctrl + Shift + B

on vscode. This command yields js files which applys uglified, mangled and jsdoc-removed.
