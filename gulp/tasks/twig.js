var gulp        = require('gulp'),
    $             = require('gulp-load-plugins')(),
    config      = require('../config').twig,
    plumber     = require('gulp-plumber'),
    notify      = require('gulp-notify'),
    twig        = require('gulp-twig'),
    fs            = require('fs'),
    path          = require('path');



gulp.task('twig', function(){
// Gets .html and .twig files
    return gulp.src(config.src)
        .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
        // output files in app folder
        .pipe($.data(function (file) {
            var extension       = '.html.twig';
            var basename        = path.basename(file.path);
            // Replace file extension for json
            var basenameJson    = basename.replace(extension, '.json');
            // Get file directories to determine the json path
            var fullDir         = path.dirname(file.path)
                // Remove templates and layouts terms
                    .replace(/templates\/?|layouts\/?/, '')
                    // Replace views dir with data dir
                    .replace('views', 'datas')
                    // Remove final '/' if there is one and Add final '/' to be sure every paths has it
                    .replace(/\/$/, '') + '/';
            var jsonFile        = fullDir + basenameJson;
    
    
            // Check if file exists
            try {
                fs.statSync(jsonFile);
                return JSON.parse(fs.readFileSync((jsonFile)));
            } catch (err) {
                console.log('No JSON File corresponding', jsonFile);
            }
    
            return null;
        }))
        // Renders template with twig
        .pipe($.twig({
            errorLogToConsole : true,
            base : config.base,
            namespaces: {
                [config.bundleName] : config.base + config.bundleName + '/'
            },
            functions : [
                {
                    name : 'asset',
                    func : function (args) {
                        if (args) {
                            return '/' + args.replace(/^[\/]?bundles\/[a-z]*\//, '');
                        }
    
                        return null;
                    }
                }
            ]
        }))
        .pipe($.notify({ message: 'Twig here' }))
        .pipe($.htmlPrettify({
            indent_char: '  ',
            indent_size: 1
        }))
        .pipe($.plumber.stop())
        .pipe($.rename(function (filePath) {
            // Remove the ***Bundle/templates for each view so browser-sync can display them directly
            filePath.dirname    = filePath.dirname.replace(/[\/]?.*Bundle[\/]?|templates[\/]?/gi, '');
            // Remove second .html to avoid .html.html files
            filePath.extname    = '';
        }))
        .pipe(gulp.dest(config.dist))
        .pipe($.notify({ message: 'Twig compiled' }));
});
