"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var generateBase64 = function generateBase64(key) {
    return new Buffer(key + ":xxx").toString("base64");
};

// let instance = null;

// export 

// export function Init(site, apiKey) {
//     console.log('INIT');
//     console.log(site, apiKey);
//     let base64 = generateBase64(apiKey);
//     instance = axios.create({
//         baseURL: site,
//         headers: {
//             'Authorization': 'BASIC ' + base64
//         }
//     })
//     console.log(instance);
// };


var SingletonFetch = function () {
    function SingletonFetch() {
        _classCallCheck(this, SingletonFetch);

        this.instance = null;
    }

    _createClass(SingletonFetch, [{
        key: "init",
        value: function init(site, apiKey) {
            console.log('init started');
            var base64 = generateBase64(apiKey);
            this.instance = _axios2.default.create({
                baseURL: site,
                headers: {
                    'Authorization': 'BASIC ' + base64
                }
            });
            console.log('init complete');
            console.log(this.instance.get);
        }
    }]);

    return SingletonFetch;
}();

exports.default = new SingletonFetch();