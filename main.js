'use strict';

/**
 * base class
 */
const App = require('./src/app');
const Command = require('./src/command');
const Workflow = require('./src/workflow');

/**
 * utils
 */
const debug = require('./src/debug');
const printer = require('./src/printer');
const locales = require('./src/locales');

/**
 * helper
 */
const str = require('./src/helper/str');
const fs = require('./src/helper/fs');
const obj = require('./src/helper/obj');
const cmd = require('./src/helper/cmd');
const is = require('./src/helper/is');
const helper = {
  str,
  fs,
  obj,
  cmd,
  is
};

module.exports = {
  App,
  Command,
  Workflow,
  debug,
  printer,
  locales,
  helper
};
