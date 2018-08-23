/* global assert, setup, suite, test */
require('aframe');
require('../index.js');
var entityFactory = require('./helpers').entityFactory;

suite('set-state component', function () {
  var component;
  var el;

  setup(function (done) {
    el = entityFactory();
    el.addEventListener('componentinitialized', function (evt) {
      if (evt.detail.name !== 'set-state') { return; }
      component = el.components['set-state'];
      done();
    });
    el.setAttribute('set-state', {});
  });

  suite('foo property', function () {
    test('is good', function () {
      assert.equal(1, 1);
    });
  });
});
