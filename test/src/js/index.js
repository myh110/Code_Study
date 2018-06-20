import Thumb from './thumb.js';


export default Thumb;


let sun = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 1000);
})


async function kang(params) {
    let xue = await sun;
    console.log(xue);
}

kang()


"use strict";

var kang = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(params) {
        var xue;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return sun;

                    case 2:
                        xue = _context.sent;

                    case 3:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function kang(_x) {
        return _ref.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { 
    return function () { 
        var gen = fn.apply(this, arguments); 
        return new Promise(function (resolve, reject) { 
            function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var sun = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(1);
    }, 1000);
});

kang();