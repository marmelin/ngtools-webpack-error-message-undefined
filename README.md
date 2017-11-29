## TypeError: Cannot read property 'message' of undefined #8626

This code is a temporary one, to get rid of the message undefined error.

*NOTE: This is not the complete project - only the part to trace the error!*

### Versions
See output of `$ ng --version`

Tested on `LInux: Ubuntu 16.04.3 LTS - 4.10.0-40-generic #44~16.04.1-Ubuntu SMP - x86_64`

### Repro steps
`npm install`

`npm -s run build:aot`

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
AOT compilation of source code.

## Other details

### Works with other compiler
The app compiles perfectly with "awesome-typescript-compiler" without AOT. 
**YOU HAVE TO COMMENT OUT THE "new AngularCompilerPlugin"-part!!!!**

### Different error with code generation on ngtools/webpack
It  does compile with "skipCodeGeneration: true" (ngctools/webpack), but with errors:
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

## RESEARCH RESULTS
Type of Result | Description
------------ | -------------
Error specification | If "awesome-typescript-loader" is used with the "new AngularCompilerPlugin"(ACP) part active (means "not commented out"), then the "No NgModule metadata"-error still occurs. => CONCLUSION: It is the webpack config parser witch has a problem rendering the plugin-configuration of ACP.
Error transformation | if "ngtools/Webpack" compiler is used with "skipCodeGeneration:true", the use of `, mainPath: helpers.getPath('src/client/web.main')  // will auto-detect the root NgModule.` instead of "entryModule:..." will result in a different error: `ERROR in TypeError: Cannot read property 'length' of undefined` ! => CONCLUSION: ???
:white_check_mark: FIX: JIT compilation works | If "src/client/web.main.ts" is used as path for the "mainPath" option (without "entryModule"-options!), every thing compiles successfully with "skipCodeGeneration: true". (or if you don't use "mainPath" or "entryModule" at all!)
