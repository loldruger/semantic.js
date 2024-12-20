# #What is Semantic.js

`Semantic.js` introduces just a pure `Javascript, ES2023` but *Rustified*, which means it contains utilizable types like `Option<T>`, `Result<T, E>`, or mimiced keyword like  `struct` or `tagged union` etc. like `The Rust Programming language` with fully documented by `Jsdoc`. so that this project is entirely virtually type-safe (no runtime fee required).

Currently this project is in `WIP` (Working In Process).

## #Develop Environment

Currently, My development environment is that, I'm working on `vscode`, with some `vscode` extensions like `Debugger for Firefox` by Firefox DevTools, `Live Preview` by Microsoft installed and am writing js codes with `@ts-check` option with `jsdoc` documentation. And I'm using `firefox` browser as a javascript runtime.

If you prefer to use other browsers like `chrome` or `msedge`, you can edit the `launch.json` in `.vscode` directory.

## Debugging

To start debugging in VS Code, select your browser (currently `firefox` setting only) and press F5.

## Building and Preparing for Deployment

This project is intended to working on modern web browser environment like `firefox`. so there is no package managers like `npm`.

1.  **Initialization:** Run the `init.sh` script in the project root to initialize the project.
2.  **Build:** Press `Ctrl + Shift + B` in VS Code to execute the build task. This performs the following steps:
    *   Removal of JSDoc comments.
    *   Code obfuscation and minification using `uglify-js`.
3. **Output:** The build artifacts are generated in the `dist` folder.

