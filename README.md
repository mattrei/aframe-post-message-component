## aframe-post-message-component

[![Version](http://img.shields.io/npm/v/aframe-post-message-component.svg?style=flat-square)](https://npmjs.org/package/aframe-post-message-component)
[![License](http://img.shields.io/npm/l/aframe-post-message-component.svg?style=flat-square)](https://npmjs.org/package/aframe-post-message-component)

A simple component that reads a JSON object from the URL Parameters and from the _Post Message_ window and fires the object as an event to probably store it into as a state.

For [A-Frame](https://aframe.io).

### API

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
|          |             |               |

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.6.0/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-post-message-component/dist/aframe-post-message-component.min.js"></script>
</head>

<body>
  <a-scene post-message>
  </a-scene>
</body>
```

#### npm

Install via npm:

```bash
npm install aframe-post-message-component
```

Then require and use.

```js
require('aframe');
require('aframe-post-message-component');
```
