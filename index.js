/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

const getUrlParameter = AFRAME.utils.getUrlParameter;
AFRAME.registerComponent('post-message', {
  schema: {
    enabled: {
      default: AFRAME.utils.isIframed(),
      type: 'boolean'
    },
    event: {
      default: 'loaded'
    },
    type: {
      default: 'aframe-scene'
    }
  },

  multiple: true,

  init: function () {
    const el = this.el;
    const data = this.data;


    this.handleEvent = this.handleEvent.bind(this);

    if (data.enabled) {
      el.addEventListener(data.event, this.handleEvent);
    }
  },

  handleEvent: function(e) {
    const sourceUrl = document.referrer;
    const msg = {
      type: this.data.type, 
      event: e.type,
      data: e.detail
    };

    if (this.data.enabled && window.parent) {
      window.parent.postMessage(msg, sourceUrl);
    }

  },

  remove: function() {
    this.el.removeEventListener(data.event, this.handleEvent);
  }
})

AFRAME.registerComponent('listen-message', {
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

    this.handleParameter = this.handleParameter.bind(this);

    if (this.el.hasLoaded) {
      this.handleParameter();
    } else {
      this.el.addEventListener('loaded', this.handleParameter);
    }
  },

  handleParameter: function() {
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
