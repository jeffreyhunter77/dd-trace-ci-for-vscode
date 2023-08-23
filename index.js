const vscode = require('vscode'); // IMPORTANT: this must come before the dd-trace/ci/init import
require('dd-trace/ci/init');
const Module = require('module');

// dd-trace has now patched Module.prototype.require in a way that makes
// vscode unavailable, so wrap their implementation to add a short-circuit
// for vscode
const ddRequire = Module.prototype.require;
const wrappedRequire = function(id) {
    if (id === 'vscode') {
        return vscode;
    }
    return ddRequire.call(this, id);
};

Module.prototype.require = wrappedRequire;
