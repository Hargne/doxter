#!/usr/bin/env node
'use strict';

const program = require('commander');
const doxter = require('../lib/index');
const packageJson = require('../package.json');

program
  .version(`v${packageJson.version}`)
  .option('-s, --source [directory]', 'source directory for gathering documentation [./]', './')
  .option('-d, --destination [directory]', 'destination for the generated documentation [./documentation/]', './documentation/')
  .parse(process.argv);

doxter.create(program);
