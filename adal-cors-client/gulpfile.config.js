///<reference path="./tools/typings/tsd.d.ts" />
'use strict';
var GulpConfig = (function () {
    function GulpConfig() {
        this.source = './src/';
        this.sourceApp = this.source + 'app/';
        this.tsOutputPath = this.source + '/appjs';
        this.allJavaScript = [this.tsOutputPath + '/**/*.js'];
        this.allTypeScript = this.sourceApp + '/**/*.ts';
        this.typings = './tools/typings/';
        this.libraryTypeScriptDefinitions = './tools/typings/**/*.ts';
        this.appTypeScriptReferences = this.typings + 'app.d.ts';
    }
    return GulpConfig;
})();
exports.GulpConfig = GulpConfig;
//# sourceMappingURL=gulpfile.config.js.map