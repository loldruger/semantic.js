# #What is Semantic.js

`Semantic.js` introduces just a pure `Javascript, ES2023` but Rustified, which means it contains utilizable types like `Option<T>`, `Result<T, E>`, or mimiced keyword like  `struct` or `Tagged Union` etc like `The Rust Programming language` with fully documented by `Jsdoc`. so that this project is entirely virtually type-safe (no runtime fee required).

Currently this project is in `WIP` (Working In Process).

## #Develop Environment

Currently, My development environment is that, I'm working on `vscode`, with some `vscode` extensions like `Debugger for Firefox` by Firefox DevTools, `Live Preview` by Microsoft installed and am writing js codes with `@ts-check` option with `jsdoc` documentation. And I'm using `firefox` browser as a javascript runtime.

If you prefer to use other browsers like `chrome` or `msedge`, you can edit the `launch.json` in `.vscode` directory.

## #Debug This Project

Set your browser Press F5.

## #How to Compile?

This project is intended to working on modern web browser environment like `firefox`. so there is no package managers like `npm`.

### #Minify The Entire Project.

Before doing this process, you should execute a shell script named `init.sh` in the root of the proect.

After `init.sh`, this project is now distribution ready, We are going to use standalone uglify the entire project with `uglify-js`:

> Ctrl + Shift + B

on vscode. This command yields js files which applies uglified, mangled and jsdoc-removed.
