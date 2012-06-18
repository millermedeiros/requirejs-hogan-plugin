var _requirejs = require('requirejs');

_requirejs.optimize({
    //stubModules can be used to remove unneeded plugins after build
    stubModules : ['text', 'hgn'],

    mainConfigFile : 'scripts/main.js',
    baseUrl : 'scripts',
    name : 'main',
    optimize : 'none',
    out : 'scripts/main_built.js'
}, console.log);
