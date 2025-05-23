# #What is Semantic.js

`Semantic.js` introduces *Rustified* `javascript`, which means it provides utilizable types, for example,  `Option<T>`, `Result<T, E>`, or mimiced keyword like `struct` and `tagged union` etc. just like `The Rust Programming language` supports.

This project has been fully documented by `Jsdoc`. So that this project is entirely and virtually type-safe with no runtime fee required.

Currently this project is in `WIP` (Working In Process).

## #Development Environment

With `@ts-check` option enabled and `jsdoc` documented, I'm working on `vscode`, with some extensions like `Debugger for Firefox` by Firefox DevTools, `Live Preview` by Microsoft installed. And I'm using `firefox` browser as a javascript runtime.

If you prefer other browsers such as `chrome` or `msedge`, you can edit the `launch.json` in `.vscode` directory.

## #Debugging

To start debugging in VS Code, select your browser (currently `firefox` setting only) and press F5.

## #Building and Preparing for Deployment

This project is intended to working on modern web browser environment like `firefox`. So there is no package managers `npm` likes.

Let it be distribution ready step by step:
1.  **Build:** Press `Ctrl + Shift + B` in VS Code to execute the build task. This performs the following steps:
    *   Removal of JSDoc comments.
    *   Code obfuscation and minification using `uglify-js`.
2. **Output:** The build artifacts are generated in the `dist` folder.
