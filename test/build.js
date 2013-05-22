var _requirejs = require('requirejs');

_requirejs.optimize({
    //stubModules can be used to remove unneeded plugins after build
    stubModules : ['text', 'hgn'],

    pragmasOnSave : {
        // you can use this pragma to exclude compiler logic from Hogan.js in
        // case you don't need to compile any templates after build
        excludeHogan : true
    },

    mainConfigFile : 'scripts/main.js',
    baseUrl : 'scripts',
    name : 'main',
    optimize : 'none',
    out : 'scripts/main_built.js'
}, console.log);
