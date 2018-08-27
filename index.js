/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

const getUrlParameter = AFRAME.utils.getUrlParameter;

/**
 * Post State component for A-Frame.
 */
AFRAME.registerComponent('post-message', {
  schema: {
    enabled: {
      default: true,
      type: 'boolean'
    },
    defaultEvent: {
      default: 'messagePosted'
    },
    type: {
      default: ''
    }
  },

  multiple: true,

  init: function () {
    const el = this.el;
    const data = this.data;

    this.handlePostMessage = this.handlePostMessage.bind(this);

    if (data.enabled) {
      window.addEventListener('message', this.handlePostMessage);
    }
  },

  handlePostMessage: function (evt) {
    if (evt.data.hasOwnProperty('type') && evt.data.type === this.data.type) {
      const data = evt.data.hasOwnProperty('data') ? evt.data.data : {};
      if (evt.data.hasOwnProperty('event')) {
	// call own event name
        this.el.emit(evt.data.event, data);
      } else {
        this.el.emit(this.data.defaultEvent, data);
      }
    }
  },

  remove: function () {
    window.removeEventListener('message', this.handlePostMessage);
											},

  pause: function () {
    window.removeEventListener('message', this.handlePostMessage);
  },

  play: function () {
    window.addEventListener('message', this.handlePostMessage);
  }
});

AFRAME.registerComponent('url-parameter', {
  schema: {
    enabled: {
      default: true,
      type: 'boolean'
    },
    defaultEvent: {
      default: 'messagePosted'
    },
    parameter: {
      default: 'message'
    }
  },

  multiple: true,

  init: function () {
    const el = this.el;

    if (this.data.enabled && this.data.parameter) {
      const detail = getUrlParameter(this.data.parameter);
      if (detail) {
	const message = JSON.parse(detail);
	const data = message.hasOwnProperty('data') ? message.data : {};
	if (message.hasOwnProperty('event')) {
          el.emit(message.event, data);
	} else {
          el.emit(this.data.defaultEvent, data);
	}
      }
    }
  }
});
