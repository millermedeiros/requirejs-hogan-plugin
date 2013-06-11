require.config({
    // set paths since they are outside the baseUrl
    paths : {
        hgn : '../../hgn',
        text : '../../text',
        hogan : '../../hogan'
    },

    // configure hgn! plugin
    hgn : {
        // load "*.mustache" files, set to empty string if you
        // want to specify the template extension for each individual file
        // the default value is ".mustache"
        templateExtension : '.mustache',

        // if you need to set custom options it can be done through the
        // "compilationOptions" setting, check hogan documentation:
        // https://github.com/twitter/hogan.js#compilation-options
        compilationOptions : {
            // delimiters : '<% %>',
            // sectionTags: [{o: '_foo', c: 'foo'}],
            // disableLambda : true
        }
    }
});


// template is loaded and compiled dynamically
// the ".mustache" extension is inferred based on the settings above
// using `require` instead of define since this is our "entry-point"
require(['hgn!foo'], function(foo){
    var data = {
        title : 'Hello!',
        names : ['world', 'foo bar', 'lorem ipsum', 'nurse']
    };

    // you can also access the `foo.template` property for debugging if needed
    // console.log( foo.template )
    document.getElementById('wrapper').innerHTML += foo(data);

});
