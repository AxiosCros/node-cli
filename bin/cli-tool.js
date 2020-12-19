#!/usr/bin/env node

'use strict';

const path = require('path');

const { App } = require('../main');

const app = new App({
  name: 'cli',
  version: '1.0.8',
  desc: 'CLI tools',
  commands_dir: path.join(__dirname, '../commands'),
  commands_sort: ['help', 'init']
});

app.start();
