## aframe-post-message-component

[![Version](http://img.shields.io/npm/v/aframe-post-message-component.svg?style=flat-square)](https://npmjs.org/package/aframe-post-message-component)
[![License](http://img.shields.io/npm/l/aframe-post-message-component.svg?style=flat-square)](https://npmjs.org/package/aframe-post-message-component)

A simple component that reads a JSON object from the _Post Message_ API or from the URL Parameters.

For [A-Frame](https://aframe.io).

### API

#### post-message

The sent data in the postMessage must be of the format `{type: '', data: {}}` . The type must correspond with the _type_ given in the components configuration.

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
| enabled | Check if too receive post message events | true |
| event | Event name to be fired with the received object | _messagePosted_ |
| type | The type name of the Post Message data to be check |  |

#### url-parameter

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
| enabled | Check if URL GET Parameters are enabled | true |
| event | Event name to be fired with the received object | _messagePosted_ |
| parameter | Query parameter key name to recognize message from | _message_ |

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
