const Uglify = require('uglify-js')
const JavaScriptObfuscator = require('javascript-obfuscator')
const fs = require('fs')

const write = (result, _path) => { fs.writeFileSync(_path, result)}
const file = (path) => fs.readFileSync(path, 'utf8').toString('utf-8')

async function parse (code, options = {}) {

    if (!options.minify) options.minify = true
    if (!options.timer) options.timer = true

    // Timer start
    if (options.timer) console.time('Script obfuscated in')

    // Obfuscate
    code = JavaScriptObfuscator.obfuscate(code, {
        compact: false,
        controlFlowFlattening: false,
        controlFlowFlatteningThreshold: 0.75,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.4,
        debugProtection: false,
        debugProtectionInterval: 0
    }).getObfuscatedCode()

    // Minify
    const uglified_ = Uglify.minify(code, {})
    if (uglified_.error) throw uglified_.error
    const uglified = uglified_.code

    let result

    if (options.minify) {
        result = uglified
    } else {
        result = code
    }

    // Timer end
    if (options.timer) console.timeEnd('Script obfuscated in')

    return result
}

module.exports = {
    parse,
    file,
    write
}