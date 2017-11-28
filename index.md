## TypeError: Cannot read property 'message' of undefined #8626

This code is a temporary one, to get rid of the message undefined error.



### Versions
```
$ ng --version
Angular CLI: 1.5.4
Node: 8.9.1
OS: linux x64
Angular: 5.0.3
... core
@angular/cli: 1.5.4
@angular/common: 5.0.1
@angular/compiler-cli: 5.0.1
@angular/compiler: 5.0.1
@angular/platform-browser-dynamic: 5.0.1
@angular/platform-browser: 5.0.1
@angular-devkit/build-optimizer: 0.0.33
@angular-devkit/core: 0.0.21
@angular-devkit/schematics: 0.0.37
@ngtools/json-schema: 1.1.0
@ngtools/webpack: 1.8.0
@schematics/angular: 0.1.7
typescript-register: 1.1.0
typescript-require: 0.2.9
typescript: 2.6.1
webpack-config: 7.5.0
webpack-dev-server: 2.9.4
webpack-node-externals: 1.6.0
webpack-stream: 4.0.0
webpack: 3.8.1
```
`LInux: Ubuntu 16.04.3 LTS - 4.10.0-40-generic #44~16.04.1-Ubuntu SMP - x86_64`


### Repro steps
Use my config and app-files below.

### Observed behavior
```
 build [=================   ] 86%
/home/python1/Dokumente/development/git/v2-web-client/node_modules/webpack/lib/Compilation.js:1312
                this.errors.forEach(function(error) {

              ^
TypeError: Cannot read property 'message' of undefined
    at /home/python1/Dokumente/development/git/v2-web-client/node_modules/webpack/lib/Compilation.js:1313:25
    at Array.forEach (<anonymous>)
    at Compilation.createHash (/home/python1/Dokumente/development/git/v2-web-client/node_modules/webpack/lib/Compilation.js:1312:15)
    at sealPart2 (/home/python1/Dokumente/development/git/v2-web-client/node_modules/webpack/lib/Compilation.js:645:9)
    at next (/home/python1/Dokumente/development/git/v2-web-client/node_modules/tapable/lib/Tapable.js:202:11)
    at Compilation.compilation.plugin (/home/python1/Dokumente/development/git/v2-web-client/node_modules/webpack/lib/ProgressPlugin.js:111:6)
    at Compilation.applyPluginsAsyncSeries (/home/python1/Dokumente/development/git/v2-web-client/node_modules/tapable/lib/Tapable.js:206:13)
    at Compilation.seal (/home/python1/Dokumente/development/git/v2-web-client/node_modules/webpack/lib/Compilation.js:605:8)
    at applyPluginsParallel.err (/home/python1/Dokumente/development/git/v2-web-client/node_modules/webpack/lib/Compiler.js:508:17)
    at /home/python1/Dokumente/development/git/v2-web-client/node_modules/tapable/lib/Tapable.js:289:11
    at _addModuleChain (/home/python1/Dokumente/development/git/v2-web-client/node_modules/webpack/lib/Compilation.js:507:11)
    at processModuleDependencies.err (/home/python1/Dokumente/development/git/v2-web-client/node_modules/webpack/lib/Compilation.js:477:14)
    at _combinedTickCallback (internal/process/next_tick.js:131:7)
    at process._tickCallback (internal/process/next_tick.js:180:9)
```

### Desired behavior
AOT compilation of my source code.

### Mention any other details that might be useful (optional)
**webpack.config.ts (main part for aot compiler)**
```
 ...
  , plugins: [
      new ProgressPlugin()
    , new HtmlWebpackPlugin({
        inject: false
        , template: helpers.getPath('config/webpack/index.ejs')
        , title: 'Webapp V2'
        , filename: 'index.html'
    })
  , new AngularCompilerPlugin({
        tsConfigPath: helpers.getPath('tsconfig.json')
        , entryModule: helpers.getPath('src/client/web.module#AppComponent')
    })
  ]
, module: {
    rules: [
        { test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/ , loader: '@ngtools/webpack' }
      , { test: /\.html$/ , loader: "raw-loader" , exclude: /\.async\.html$/ }
      , { test: /\.css$/ , loader: ['css-loader'] }
   ]
  }
```
**web.main.ts**
```
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import { WebModule } from './web.module';
platformBrowserDynamic().bootstrapModule(WebModule /*, options*/)
  .catch(err => console.log(err));

```
**web.module.ts**
```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_COMPONENTS, AppComponent } from './app/components/index.components';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ APP_COMPONENTS ],
  bootstrap: [ AppComponent ]
})
export class WebModule { }

```
**app.component.ts**
```
import { Component } from '@angular/core';
@Component ({
   moduleId: module.id.toString()
  , selector: 'aslingo-app'
  , templateUrl: 'app.component.html'
  , styleUrls: ['app.component.css']
})

export class AppComponent {  title = 'title is that'; }

```
**index.components.ts**
```
import { AppComponent } from './app.component';
export const APP_COMPONENTS: any[] = [  AppComponent ];
export * from './app.component';
```

- The app compiles perfectly with "awesome-typescript-compiler" without AOT. 
- It  does compile with "skipCodeGeneration: true" (ngctools/webpack), but with errors:
```
ERROR in Error: No NgModule metadata found for 'AppComponent'.
    at NgModuleResolver.resolve (/home/python1/Dokumente/development/git/v2-web-client/node_modules/packages/compiler/esm5/src/ng_module_resolver.js:50:12)
    at CompileMetadataResolver.getNgModuleMetadata (/home/python1/Dokumente/development/git/v2-web-client/node_modules/packages/compiler/esm5/src/metadata_resolver.js:641:58)
    at visitLazyRoute (/home/python1/Dokumente/development/git/v2-web-client/node_modules/packages/compiler/esm5/src/aot/compiler.js:757:14)
    at AotCompiler.listLazyRoutes (/home/python1/Dokumente/development/git/v2-web-client/node_modules/packages/compiler/esm5/src/aot/compiler.js:725:17)
    at AngularCompilerProgram.listLazyRoutes (/home/python1/Dokumente/development/git/v2-web-client/packages/compiler-cli/src/transformers/program.ts:194:26)
    at Function.NgTools_InternalApi_NG_2.listLazyRoutes (/home/python1/Dokumente/development/git/v2-web-client/packages/compiler-cli/src/ngtools_api.ts:95:34)
    at AngularCompilerPlugin._getLazyRoutesFromNgtools (/home/python1/Dokumente/development/git/v2-web-client/node_modules/@ngtools/webpack/src/angular_compiler_plugin.js:246:66)
    at Promise.resolve.then.then (/home/python1/Dokumente/development/git/v2-web-client/node_modules/@ngtools/webpack/src/angular_compiler_plugin.js:542:50)
    at <anonymous>
    at process._tickCallback (internal/process/next_tick.js:188:7)
    at Function.Module.runMain (module.js:678:11)
    at startup (bootstrap_node.js:187:16)
    at bootstrap_node.js:608:3
```
