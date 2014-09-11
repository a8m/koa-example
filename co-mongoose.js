
/**
 * Module dependencies.
 */

var thunkify = require('thunkify');

/**
 * Methods to wrap.
 */

var methods = {

  $constructor: [
    'create',
    'remove',
    'update',
    'find',
    'findById',
    'findOne',
    'findByIdAndUpdate',
    'findByIdAndRemove',
    'findOneAndUpdate',
    'findOneAndRemove',
    'count'
  ],

  $prototype: [
    'save'
  ]

};

/**
 * Wrap `col`.
 *
 * @param {Collection} col
 * @return {Collection}
 * @api public
 */

module.exports = function(col) {

  methods.$constructor.forEach(function(method){
    col[method] = thunkify(col[method]);
  });

  methods.$prototype.forEach(function(method){
    col.prototype[method] = thunkify(col.prototype[method]);
  });

  return col;
};
