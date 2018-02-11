'use strict';
const Q = require('q');
function wrap(genFn) {
    const cr = Q.async(genFn);
    return function (req, res, next) {
        cr(req, res, next).catch(next);
    };
}
module.exports = wrap;
//# sourceMappingURL=promiseWrap.js.map