///<reference path="./tools/typings/tsd.d.ts" />
///<reference path="./gulpfile.config.ts" />
'use strict';
var gulp = require('gulp'), debug = require('gulp-debug'), inject = require('gulp-inject'), tsc = require('gulp-typescript'), tslint = require('gulp-tslint'), sourcemaps = require('gulp-sourcemaps'), clean = require('gulp-clean');
var GulpConfig = require('./gulpfile.config');
var config = new GulpConfig.GulpConfig;
/**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 */
gulp.task('gen-ts-refs', function () {
    var target = gulp.src(config.appTypeScriptReferences);
    var sources = gulp.src([config.allTypeScript], { read: false });
    return target.pipe(inject(sources, {
        starttag: '//{',
        endtag: '//}',
        transform: function (filepath) {
            return '/// <reference path="../..' + filepath + '" />';
        }
    })).pipe(gulp.dest(config.typings));
});
/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
    return gulp.src(config.allTypeScript).pipe(tslint()).pipe(tslint.report('prose'));
});
/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {
    var sourceTsFiles = [config.allTypeScript, config.libraryTypeScriptDefinitions, config.appTypeScriptReferences]; //reference to app.d.ts files
    var tsResult = gulp.src(sourceTsFiles).pipe(sourcemaps.init()).pipe(tsc({
        target: 'ES5',
        declarationFiles: false,
        noExternalResolve: true
    }));
    tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
    return tsResult.js.pipe(sourcemaps.write('.')).pipe(gulp.dest(config.tsOutputPath));
});
/**
 * Remove all generated JavaScript files from TypeScript compiltion.
 */
gulp.task('clean-ts', function () {
    var typeScriptGenFiles = [config.tsOutputPath, config.sourceApp + '**/*.js', config.sourceApp + '**/*.js.map'];
    // delete the files
    return gulp.src(typeScriptGenFiles, { read: false }).pipe(clean());
});
gulp.task('watch', function () {
    gulp.watch([config.allTypeScript], ['ts-lint', 'compile-ts', 'gen-ts-refs']);
});
gulp.task('default', ['ts-lint', 'compile-ts', 'gen-ts-refs', 'watch']);
//# sourceMappingURL=gulpfile.js.map