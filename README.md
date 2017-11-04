# babel-plugin-hnt
[![npm version](https://badge.fury.io/js/babel-plugin-hnt.svg)](https://badge.fury.io/js/babel-plugin-hnt) [![Build Status](https://travis-ci.org/divyagnan/babel-plugin-hnt.svg?branch=master)](https://travis-ci.org/divyagnan/babel-plugin-hnt)

Compiles away [`hnt`](https://github.com/divyagnan/hnt) function calls so you can get ergonomic and safety benefits of hnt without the increased bundle size. 

## Example

**In**

```js
// input code
hnt(myArray, "[0].potentialValue", 42)
```

**Out**

```js
"use strict";

// output code
myArray && myArray[0] && myArray[0].potentialValue || 42;
```

## Installation

```sh
$ npm install babel-plugin-hnt
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["hnt"]
}
```

### Via CLI

```sh
$ babel --plugins hnt script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["hnt"]
});
```
