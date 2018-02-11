'use strict';

import Q = require('q');

function wrap(genFn) {
  const cr = Q.async(genFn);
  return function (req, res, next) {
    cr(req, res, next).catch(next);
  };
}

export = wrap;