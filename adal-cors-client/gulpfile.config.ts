///<reference path="./tools/typings/tsd.d.ts" />

'use strict';

export class GulpConfig {
  public source = './src/';
  public sourceApp = this.source + 'app/';

  public tsOutputPath = this.source + '/appjs';
  public allJavaScript = [this.tsOutputPath + '/**/*.js'];
  public allTypeScript = this.sourceApp + '/**/*.ts';

  public typings = './tools/typings/';
  public libraryTypeScriptDefinitions = './tools/typings/**/*.ts';
  public appTypeScriptReferences = this.typings + 'app.d.ts';
}
