'use strict';

const printer = require('./printer');
const debug = require('./debug');
const { __ } = require('./locales');
const { _confirm, _select, _ask, _table } = require('./helper/cmd');

class Command {
  constructor(config) {
    this.config = {
      name: '',
      alias: [],
      desc: '',
      args: [],
      options: [],
      ...config
    };
    this.debug = debug;
    this.printer = printer;

    // check arguments
    let set = [];
    this.config.args.forEach((arg) => {
      if (set.indexOf(arg.name) > -1) {
        debug.error(__('Argument Name Duplication  : ${name}', { name: arg.name }));
      }
      set.push(arg.name);
    });
    // check options
    set = ['help', 'h'];
    this.config.options.forEach((option) => {
      if (set.indexOf(option.name) > -1) {
        debug.error(__('Option Name Duplication : ${name}', { name: option.name }));
      }
      set.push(option.name);
      if (option.short) {
        if (set.indexOf(option.short) > -1) {
          debug.error(__('Option Short Name Duplication : -${short} for ${name} option', { short: option.short, name: option.name }));
        }
        set.push(option.short);
      }
    });
  }

  usage() {
    printer.println();
    if (this.config.desc) {
      printer.yellow('Description:').println();
      printer.print(`  ${__(this.config.desc)}`).println().println();
    }
    // print usage
    printer.yellow('Usage:').println();
    printer.print(`  ${this.config.name}`);
    if (this.config.options.length) {
      printer.print(' [options]');
    }
    if (this.config.args.length) {
      if (!this.config.args.some(arg => arg.mode === 'required')) {
        printer.print(' [--]');
      }
      this.config.args.forEach((arg) => {
        if (arg.mode === 'optional') {
          printer.print(` [${arg.name}]`);
        } else {
          printer.print(` <${arg.name}>`);
        }
      });
      printer.println().println();
      printer.yellow('Arguments:').println();
      this.config.args.forEach((arg) => {
        printer.print(' ');
        if (arg.mode === 'required') {
          printer.red('*');
        } else {
          printer.print(' ');
        }
        printer.print(printer.fgGreen).fixed(arg.name, 20).print(printer.reset).println(arg.desc ? __(arg.desc) : '');
      });
    } else {
      printer.println();
    }
    if (this.config.options.length) {
      printer.println();
    }
    if (this.config.options.length) {
      printer.yellow('Options:').println();
      this.config.options.forEach((option) => {
        let str = '';
        if (option.short) {
          str += `-${option.short}, `;
        }
        str += `--${option.name}`;
        printer.print(' ');
        if (option.mode === 'required') {
          printer.red('*');
        } else {
          printer.print(' ');
        }
        printer.print(printer.fgGreen).fixed(str, 20).print(printer.reset);
        printer.print(option.desc ? __(option.desc) : '');
        printer.println();
      });
    } else {
      printer.println();
    }
  }

  async exec() {
    printer.warning(__('Please override exec() method for ${name} command', { name: this.config.name }));
  }

  async ask(message = '', default_value = null) {
    return await _ask(message, default_value);
  }

  async confirm(message = '', default_value = false) {
    return await _confirm(message, default_value);
  }

  async select(message = '', choices = [], default_choice = null) {
    return await _select(message, choices, default_choice);
  }

  async table(rows = [], headers = []) {
    printer.println();
    _table(rows, headers, {
      margin_left: 4,
      spacing: '-',
      padding: ' '
    });
    printer.println();
  }
}

module.exports = Command;
