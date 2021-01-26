# @axiosleo/cli-tool

[![NPM version](https://img.shields.io/npm/v/@axiosleo/cli-tool.svg?style=flat-square)](https://npmjs.org/package/@axiosleo/cli-tool)
[![npm download](https://img.shields.io/npm/dm/@axiosleo/cli-tool.svg?style=flat-square)](https://npmjs.org/package/@axiosleo/cli-tool)

> Design for quickly developing CLI applications with Node.js
> 
> See detail usage from [wiki](https://github.com/AxiosCros/node-cli/wiki)

## Installation

```bash
npm install @axiosleo/cli-tool
```

## Quickly initialize application

```bash
npm install @axiosleo/cli-tool -g

cli-tool init <app-name>

# make command file
cli-tool make <command-name> <commands-dir-path>
# for example
cli-tool make test ./commands/ # will generate ./commands/test.js command file
```

## Usage

### Start application

```js
const { App } = require('@axiosleo/cli-tool');
const app = new App({
  name: 'cli', // cli app command name
  desc: 'cli app description',
  version: '1.0.0',
  commands_dir: '/path/to/commands/dir/', // will auto load command files
  commands_sort: ['help', ... ],
  commands_group: {
    'group description': ['command_name', ...],
  }
});
app.start();

// or
app.register(require('/path/to/your/command/file'))
   // ... ...
   .register(require('/path/to/your/other-command/file'));
app.run();
```

### Run single command

```js
app.register(require('path/to/your/command/file'));
app.exec("<command-name>");
```

## Use locales

> The "desc" will be automatically translated by using the locales json file.
> 
> locales example json file : [locales](./locales)

```js
const path = require('path');
app.locale({
  dir: path.join(__dirname, '../locales'), // /path/to/app/locales/dir
  sets: ['en-US', 'zh-CN'],                // cannot be empty, the first set as default.
});
app.start(); // set locale before start app
```

### Command example

```js
'use strict';

const { Command } = require('@axiosleo/cli-tool');

class CommandExample extends Command {
    constructor() {
    super({
      name: 'command-name',
      desc: 'command desc',
      alias: ['command-alia1','command-alia2', ...],
      args: [
          {
            name: 'name',     // argument name
            mode: 'optional', // required | optional
            desc: 'arg desc',
            default: null     // only supported optional mode
          }
      ],
      options: [
          {
            name: 'name',     // option name
            short: 'n',       // like 'n'
            mode: 'optional', // required | optional
            desc: 'option desc',
            default: null     // only supported optional mode
          }
      ],
    });
  }

  async exec(args, options, argList, app) {
      // do something in here

      // get arg&option by name
      const arg1 = args.argName;
      const option1 = options.optionName;

      // get arg by index
      const arg2 = argList[index];

      // ask for answer
      const answer = await this.ask('Please input your answer');

      // ask for confirm, default value is 'false'
      const confirm = await this.confirm('Confirm do this now?', false);
  }
}

module.exports = CommandExample;
```

## License

This project is open-sourced software licensed under the [MIT](LICENSE).
