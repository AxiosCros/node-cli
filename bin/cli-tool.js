#!/usr/bin/env node

'use strict';

const path = require('path');

const { App } = require('../main');

const app = new App({
  name: 'cli',
  version: '1.0.10',
  desc: 'For quickly initialize CLI application',
  commands_dir: path.join(__dirname, '../commands'),
  commands_sort: ['help', 'init']
});
app.locale({
  dir: path.join(__dirname, '../locales'),
  sets: ['en-US', 'zh-CN']
});
app.start();
