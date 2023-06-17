# SafeDOMParser

Feature-rich implementation of `DOMParser` with XSS protection and sanitization built-in.
Includes support for IDL attributes and onevent attributes (including Custom Events).

## For users with an access token

Add a `.npmrc` file to your project, with the following lines:

```text
@zooduck:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_ACCESS_TOKEN
```

Install from the command line:

```node
npm install @zooduck/safe-dom-parser@latest
```

Install via package.json:

```json
"@zooduck/safe-dom-parser": "latest"
```

## For users without an access token

Clone or [Download](https://github.com/zooduck/safe-dom-parser/archive/refs/heads/master.zip) the repository to your machine.

## Getting started

Copy the `modules` folder to your project.

## Import

Import using a module file:

```javascript
import 'path/to/modules/@zooduck/safe-dom-parser/index.module.js'
```

Import using a script tag:

```html
<script type="module" src="path/to/modules/@zooduck/safe-dom-parser/index.module.js"></script>
```

## Use

The `SafeDOMParser` class is purpose built to be used with Web Components (Custom Elements) but can be used anywhere.

If you want to use onevent type attributes, you must pass the event listener context to the constructor. (See examples below for more details).

## Examples

### 1a. Attach event listeners using onevent attributes (web component)

```javascript
class MyCustomElement extends HTMLElement {
  // ...
  onClickHandler(event) {
    // ...
  }
  onClicketyClickClickHandler(event) {
    // ...
  }
  #createButton() {
    // Don't forget to pass the event listener context to the constructor!
    return new SafeDOMParser(this).parseFromString`
      <button on:click="onClickHandler()">Click me</button>
    `
  }
  // Always use all lowercase alpha characters for custom events:
  #createButtonWithCustomEventListener() {
    // Don't forget to pass the event listener context to the constructor!
    return new SafeDOMParser(this).parseFromString`
      <custom-button on:clicketyclickclick="onClicketyClickClickHandler()">Click me</custom-button>
    `
  }
}
```

### 1b. Attach event listeners using onevent attributes (other)

```javascript
const eventListeners = {
  onClickHandler(event) {
    // ...
  }
  onClicketyClickClickHandler(event) {
    // ...
  }
}

const createButton = () => {
  // Don't forget to pass the event listener context to the constructor!
  return new SafeDOMParser(this).parseFromString`
    <button on:click="onClickHandler()">Click me</button>
  `
}

const createButtonWithCustomEventListener = () => {
  // Always use all lowercase alpha characters for custom event types!
  // Don't forget to pass the event listener context to the constructor!
  return new SafeDOMParser(this).parseFromString`
    <custom-button on:clicketyclickclick="onClicketyClickClickHandler()">Click me</custom-button>
  `
}
```

### 2. Set an IDL attribute / DOM property

```javascript
// Unlike content attributes, the value of a DOM property can be anything (in this case, a boolean).
const readonlyInput = new SafeDOMParser().parseFromString`<input [readOnly]=${true}>`
```

### 3. Create mutiple elements

```javascript
const ul = document.querySelector('ul')
// Returns an array of elements
const listItems = new SafeDOMParser().parseFromString`
  <li>1</li>
  <li>2</li>
`
ul.append(...listItems)
```
