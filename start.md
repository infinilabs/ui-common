# 搭建项目

```sh
node -v
# 20.12.2

npm i pnpm -g

pnpm -v
# 9.3.0

pnpm init
# package.json

# pnpm-workspace.yaml
# https://pnpm.io/zh/pnpm-workspace_yaml
````
## 测试

```sh
npm link


```

## 发布

```sh
# publish
nrm use npm

npm login

npm publish
```

## 打包

项目打包成 `["es", "cjs", "umd", "iife"]` 四种格式，目的是为了满足不同的使用场景和环境。下面是每种格式的典型使用场景及其使用方式：

### 1. `es` (ESM - ECMAScript Modules)

- **使用场景**: 适用于现代 JavaScript 项目和工具链，特别是在支持 ES 模块的环境中，如现代浏览器和使用模块化系统的 Node.js 环境。
- **使用方式**:
  - **浏览器**: 使用 `<script type="module">` 标签引入模块。
    ```html
    <script type="module">
      import { myFunction } from './path/to/your-library.es.js';
      myFunction();
    </script>
    ```
  - **Node.js**: 在支持 ES 模块的 Node.js 环境中（Node.js 12+），可以直接使用 `import` 语法。
    ```javascript
    import { myFunction } from 'your-library';
    myFunction();
    ```
    > 注意：需要在 `package.json` 中设置 `"type": "module"`，或者使用 `.mjs` 文件后缀。

### 2. `cjs` (CommonJS)

- **使用场景**: 用于 Node.js 环境，或者需要兼容不支持 ES 模块的工具或库。大多数 Node.js 项目和老旧的模块都基于 CommonJS 规范。
- **使用方式**:
  - **Node.js**: 使用 `require` 语法导入模块。
    ```javascript
    const { myFunction } = require('your-library');
    myFunction();
    ```
- **兼容性**: 适用于所有版本的 Node.js 和一些旧的模块系统。即使在不支持 ES 模块的项目中也可以使用。

### 3. `umd` (Universal Module Definition)

- **使用场景**: 适用于多种环境，包括浏览器、Node.js、AMD（异步模块定义），特别是打包库时希望它能在不同环境中通用。
- **使用方式**:
  - **浏览器**: 可以通过 `<script>` 标签直接在浏览器中引入，并通过全局变量访问库。
    ```html
    <script src="path/to/your-library.umd.js"></script>
    <script>
      // 使用全局变量 yourLibrary
      yourLibrary.myFunction();
    </script>
    ```
  - **Node.js**: 可以使用 `require` 语法导入。
    ```javascript
    const yourLibrary = require('your-library');
    yourLibrary.myFunction();
    ```
  - **AMD**: 在使用 AMD 加载器（如 RequireJS）时可以直接引入。
    ```javascript
    require(['path/to/your-library.umd.js'], function (yourLibrary) {
      yourLibrary.myFunction();
    });
    ```
- **兼容性**: 适合几乎所有环境，是打包公共库的常用格式。

### 4. `iife` (Immediately Invoked Function Expression)

- **使用场景**: 适用于在浏览器中直接通过 `<script>` 标签引入并立即执行的场景，通常用来快速引入一个库或工具，而不需要任何模块化系统。
- **使用方式**:
  - **浏览器**: 通过 `<script>` 标签直接引入，在全局命名空间下挂载库，可以直接使用全局变量。
    ```html
    <script src="path/to/your-library.iife.js"></script>
    <script>
      // 使用全局变量 yourLibrary
      yourLibrary.myFunction();
    </script>
    ```
- **优点**: 在没有模块化加载器的情况下也能直接使用，适用于简单的网页场景或快速开发。

### 小结

- **`es` (ESM)**: 适用于现代项目，浏览器环境中使用 `<script type="module">`，Node.js 环境中使用 `import`。
- **`cjs` (CommonJS)**: 适用于 Node.js 环境，使用 `require` 导入。适合不支持 ES 模块的工具或老旧项目。
- **`umd` (Universal Module Definition)**: 通用格式，适用于多种环境，包括浏览器、Node.js、AMD。可以通过 `<script>` 引入或 `require` 导入。
- **`iife` (Immediately Invoked Function Expression)**: 适用于浏览器直接引入，在全局变量下使用，通常用于快速开发或简单网页场景。

通过打包成这四种格式，你的库可以适应各种使用环境，既可以被现代模块化项目引用，也可以直接在浏览器中使用。