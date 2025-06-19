'use strict';

const zohoCloneApiService = require('..');
const assert = require('assert').strict;

assert.strictEqual(zohoCloneApiService(), 'Hello from zohoCloneApiService');
console.info('zohoCloneApiService tests passed');
