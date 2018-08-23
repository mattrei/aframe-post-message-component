(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

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
    event: {
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
		const data = this.data;

		if (evt.data.hasOwnProperty('type') && evt.data.hasOwnProperty('data')
			&& evt.data.type === data.type) {
			
			this.el.emit(data.event, evt.data.data);
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
    event: {
      default: 'messagePosted'
    },
    parameter: {
      default: 'message'
    }
  },

  multiple: true,

  init: function () {
    const el = this.el;
    const data = this.data;

    if (data.enabled && data.parameter) {
      const detail = getUrlParameter(data.parameter);
      if (detail) {
        el.emit(data.event, JSON.parse(detail));
      }
    }
  }
});

})));
