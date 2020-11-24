'use strict';

import 'nodelist-foreach-polyfill';
import "@babel/polyfill";
import "formdata-polyfill";
import "fetch-polyfill";
import 'request-animation-frame-polyfill';


// closest polyfill
if (!Element.prototype.matches) {
    Element.prototype.matches =
    Element.prototype.msMatchesSelector || 
    Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;

        do {
            if (Element.prototype.matches.call(el, s)) {
              return el;
            }
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}


// append polyfill
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('append')) {
      return;
    }
    Object.defineProperty(item, 'append', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();
        
        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });
        
        this.appendChild(docFrag);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

// remove polyfill
(function() {
  var arr = [window.Element, window.CharacterData, window.DocumentType];
  var args = [];

  arr.forEach(function (item) {
    if (item) {
      args.push(item.prototype);
    }
  });

  (function (arr) {
    arr.forEach(function (item) {
      if (item.hasOwnProperty('remove')) {
        return;
      }
      Object.defineProperty(item, 'remove', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function remove() {
          this.parentNode.removeChild(this);
        }
      });
    });
  })(args);
})();


import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import popup from './modules/popup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changeImg from './modules/changeImg';
import calculator from './modules/calculator';
import sendForm from './modules/sendForm';
import calcValidate from './modules/calcValidate';


countTimer('20 november 2020');

toggleMenu();

popup();

tabs();

slider();

changeImg();

calcValidate();

calculator(100);

sendForm();