/**@license
 * RequireJS Hogan Plugin | v0.1.0 (2012/06/18)
 * Author: Miller Medeiros | MIT License
 */
define(['hogan', 'text'], function (hogan, text) {

    var _buildMap = {};
    var _buildTemplateText = 'define("{{pluginName}}!{{moduleName}}", ["hogan"], function(hogan){'+
                             '  return new hogan.Template({{{fn}}}, "", hogan);'+
                             '});\n';
    var _buildTemplate;


    function load(name, req, onLoad, config){
        var hgnConfig = config.hgn;
        var fileName = name;
        fileName += hgnConfig && hgnConfig.templateExtension != null? '.'+ hgnConfig.templateExtension : '.mustache';

        // load text files with text plugin
        text.get(req.toUrl(fileName), function(data){
            var compilationOptions = hgnConfig.compilationOptions? mixIn({}, hgnConfig.compilationOptions) : {};

            if (config.isBuild) {
                // store compiled function if build
                // and should always be a string
                compilationOptions.asString = true;
                _buildMap[name] = hogan.compile(data, compilationOptions);
            }

            // maybe it's required by some other plugin during build
            // so return the compiled template even during build
            onLoad( hogan.compile(data, compilationOptions) );
        });
    }

    function mixIn(target, source) {
        var key;
        for (key in source){
            if ( Object.prototype.hasOwnProperty.call(source, key) ) {
                target[key] = source[key];
            }
        }
        return target;
    }

    function write(pluginName, moduleName, writeModule){
        if(moduleName in _buildMap){
            if (! _buildTemplate) {
                // using templates to generate compiled templates, so meta :P
                _buildTemplate = hogan.compile( _buildTemplateText );
            }
            var fn = _buildMap[moduleName];
            writeModule( _buildTemplate.render({
                pluginName : pluginName,
                moduleName : moduleName,
                fn : fn
            }) );
        }
    }

    return {
        load : load,
        write : write
    };

});
