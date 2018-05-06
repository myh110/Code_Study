/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__thumb_es6__ = __webpack_require__(1);



/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__thumb_es6__["a" /* default */]);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__praiseButton_es6__ = __webpack_require__(2);



class Thumb extends __WEBPACK_IMPORTED_MODULE_0__praiseButton_es6__["a" /* default */] {
    constructor(clikeElName, addElName,count){
        super(count)
        this.clikeEl = document.querySelector(`.${clikeElName}`)
        this.addEl = document.querySelector(`.${addElName}`)
        this.bindEvent();
        this.render()
    }

    render(){
        this.addEl.innerHTML = this.count;
    }
    bindEvent(){
    
        addEvent(this.clikeEl, 'click', this.handle.bind(this), false);
    }
    handle(){
        axios.get('/index/update')
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
        this.add()
        this.render()
    }
}
const addEvent = (function() {
    if(window.addEventListener) {
        return function(elem, type, fn, capture) {
            if(type.indexOf(",") !== -1) {
                var types = type.split(/(?:\s+)?\,(?:\s+)?/);
                for(var i = 0; i < types.length; i++) {
                    elem.addEventListener(types[i], fn, capture);
                }
            } else {
                elem.addEventListener(type, fn, capture);
            }
        }
    } else {
        return function(elem, type, fn, capture) {
            if(type.indexOf(",") !== -1) {
                var types = type.split(/(?:\s+)?\,(?:\s+)?/);
                for(var i = 0; i < types.length; i++) {
                    elem.attachEvent('on' + types[i], fn);
                }
            } else {
                elem.attachEvent('on' + type, fn);
            }
        }
    }
})();
/* harmony default export */ __webpack_exports__["a"] = ({Thumb});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class PraiseButton {
    constructor(count = 0){
      
        this.count = count
       
    }
    
    add(){
        this.count++ 
   
    }
}


/* harmony default export */ __webpack_exports__["a"] = (PraiseButton);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);