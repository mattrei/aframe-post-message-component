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
    postMessageEvent: {
      default: true,
      type: 'boolean'
    },
    urlParameter: {
      default: 'state'
    },
    event: {
      default: 'statePosted'
    }
  },

  /**
   * Set if component needs multiple instancing.
   */
  multiple: false,

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    const el = this.el;
    const data = this.data;

    this.handlePostMessage = this.handlePostMessage.bind(this);

    if (data.postMessageEvent) {
      window.addEventListener('message', this.handlePostMessage); 
    }

    if (data.urlParameter) {
      const detail = getUrlParameter(data.urlParameter);
      if (detail) {
        el.emit(data.event, JSON.parse(detail));
      }
    }
  },

  handlePostMessage: function (evt) {

        this.el.emit(this.data.event, evt.data);
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) { },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () { },

  /**
   * Called on each scene tick.
   */
  // tick: function (t) { },

  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function () { 
      window.removeEventListener('message', this.handlePostMessage); 
  },

  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function () { 
      window.addEventListener('message', this.handlePostMessage); 
  }
});

})));
