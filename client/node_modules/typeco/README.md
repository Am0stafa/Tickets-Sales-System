# TypeCo

[![dependencies Status](https://david-dm.org/nutboltu/typeco/status.svg)](https://david-dm.org/nutboltu/typeco) [![Build Status](https://travis-ci.org/nutboltu/typeco.svg?branch=master)](https://travis-ci.org/nutboltu/typeco)

A javascript micro library which allows you to check javascript data types.
<!-- TOC -->

- [TypeCo](#typeco)
  - [Installation](#installation)
  - [Usage](#usage)
    - [isArray()](#isarray)
    - [isObject()](#isobject)
    - [isString()](#isstring)
    - [isDate()](#isdate)
    - [isRegExp()](#isregexp)
    - [isFunction()](#isfunction)
    - [isBoolean()](#isboolean)
    - [isNumber()](#isnumber)
    - [isEmpty()](#isempty)
    - [isEmptyOrZero()](#isemptyorzero)
  - [License](#license)

<!-- /TOC -->

## Installation

```bash
  npm install typeco
```

## Usage

`typeco` supports following functions and returns boolean value by checking the corresponding data type.

### isArray()

```javascript
  var typeco = require('typeco');
  var arr = [1, 2];
  var noArr = '';

  typeco.isArray(arr);        // true
  typeco.isArray(noArr);      // false
```

### isObject()

```javascript
  var typeco = require('typeco');
  var obj = { name: 'typeco' };
  var noObj = '';

  typeco.isObject(obj);        // true
  typeco.isObject(notObj);     // false
```

### isString()

```javascript
  var typeco = require('typeco');
  var str = 'typeco-string';
  var noStr = [];

  typeco.isString(str);        // true
  typeco.isString(noStr);     // false
```

### isDate()

```javascript
  var typeco = require('typeco');
  var date = new Date();
  var noDate = '';

  typeco.isDate(date);        // true
  typeco.isDate(noDate);     // false
```

### isRegExp()

```javascript
  var typeco = require('typeco');
  var reg = new RegExp('ab+c');
  var noReg = '';

  typeco.isRegExp(reg);        // true
  typeco.isRegExp(noReg);     // false
```

### isFunction()

```javascript
  var typeco = require('typeco');
  var func = function() {
    // this is a function
  };
  var noFunc = '';

  typeco.isFunction(func);        // true
  typeco.isFunction(noFunc);     // false
```

### isBoolean()

```javascript
  var typeco = require('typeco');
  var bool = true;
  var boolString = 'true';
  var noBool = '';

  typeco.isBoolean(bool);         // true
  typeco.isBoolean(boolString);   // true
  typeco.isBoolean(noBool);       // false
```

### isNumber()

```javascript
  var typeco = require('typeco');
  var num = 1;
  var noNum = '';

  typeco.isNumber(num);         // true
  typeco.isNumber(noNum);       // false
```

### isEmpty()

This function return true if an object has no keys or an array has no items or a string is empty or the data is either null or undefined.

```javascript
  var typeco = require('typeco');
  var str = '';
  var arr = [];
  var obj = {};
  var empty1 = null;
  var empty2 = undefined;

  typeco.isEmpty(str);         // true
  typeco.isEmpty(arr);         // true
  typeco.isEmpty(obj);         // true
  typeco.isEmpty(empty1);      // true
  typeco.isEmpty(empty2);      // true
```

### isEmptyOrZero()

This functions works exactly same as `isEmpty()` but also returns true if the data is number and value is 0.

```javascript
  var typeco = require('typeco');
  var num = 0;

  typeco.isEmptyOrZero(num);    // true
```

## License

MIT Licensed. Copyright (c) Farhad Yasir 2018.
