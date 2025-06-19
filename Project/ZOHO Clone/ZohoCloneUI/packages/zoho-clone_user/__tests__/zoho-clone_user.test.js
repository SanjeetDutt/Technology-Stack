'use strict';

const zohoCloneUser = require('..');
const assert = require('assert').strict;

assert.strictEqual(zohoCloneUser(), 'Hello from zohoCloneUser');
console.info('zohoCloneUser tests passed');
