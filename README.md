## aframe-post-message-component

[![Version](http://img.shields.io/npm/v/aframe-post-message-component.svg?style=flat-square)](https://npmjs.org/package/aframe-post-message-component)
[![License](http://img.shields.io/npm/l/aframe-post-message-component.svg?style=flat-square)](https://npmjs.org/package/aframe-post-message-component)

A simple component that reads a JSON object from the _Post Message_ API or from the URL Parameters and fires an event. A common usage scenario would be to update the applications state.

For [A-Frame](https://aframe.io).

### API

#### post-message

This component listes to events from the element and redirects the event detail via postMessage to its parent window. So it only works if the whole A-Frame scene is embedded within an IFrame. The format of the posted message is `{type: '', event: '', data: {}}`, where the _type_ property is the _type_ and the _event_ as in the schema and the _data_ is the events detail object.

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
| enabled | Listen to events and send data as a post message to its parent window | `AFRAME.utils.isIframed` |
| type | The type name of the post message for the parent to identify |  |
| event | Event name to listen and redirect as a post message | _loaded_ |


#### listen-message

Must be attached to the _scene_ entity.

The sent data in the postMessage is opionated by this library and must be of the format `{type: '', event: '', data: {}}` whereas the _event_ property is optional. The _type_ property must correspond with the _type_ given in the components configuration.

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
| enabled | Listen to postMessage events | true |
| type | The type name of the Post Message data to be check |  |
| defaultEvent | Event name to be fired when the received postMessage has no _event_ property | _messagePosted_ |

#### url-parameter

Must be attached to the _scene_ entity.

The URL parameter is in the form `&parameter={}` whereas the _parameter_ name is defined by the schema and defaults to `message`

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
| enabled | Read URL GET Parameters once when the scene is loaded | true |
| parameter | Query parameter key name to recognize message from | _message_ |
| defaultEvent | Event name to be fired when the received message has no _event_ property | _messagePosted_ |

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
  <a-scene post-message listen-message url-parameter>
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
