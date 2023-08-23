# dd-trace-ci-for-vscode

This is a simple init script that includes [dd-trace/ci/init](https://github.com/DataDog/dd-trace-js) in a way that allows tests to be run with [@vscode/test-electron](https://github.com/Microsoft/vscode-test).

## Usage

In the script you provide to `runTests`, for example, using Mocha:

```js
require('dd-trace-ci-for-vscode');
const Mocha = require('mocha');
const path = require('path');

module.exports.run = function() {
  const mocha = new Mocha({
    ui: 'tdd',
  });

  mocha.addFile(path.resolve(__dirname, 'suite.js'));

  return new Promise((resolve, reject) => {
    mocha.run(failures => {
      if (failures) {
        reject(new Error(`${failures} tests failed.`));
      } else {
        resolve();
      }
    });
  });
}
```
