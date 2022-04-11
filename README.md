# jsbinary
 jsbinaries is a  precompiler for javascript which makes it unreadable for humans

# Usage
```js
const JSBinaries = require('../')
const path = require('path')

JSBinaries.parse(JSBinaries.file(path.join(__dirname, 'myscript.js')), {
    minify: true,
    timer: true
}).then(result => {
    JSBinaries.write(result, path.join(__dirname, 'myscript.bin.js'))
})
```