import * as webpack from 'webpack';
import * as path from 'path';
import * as fs from 'fs';
import * as helpers from '../../tools/helpers/helper.index';
import { ProdAOTConfig } from '../../config/environment/environment.aot-production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ProgressPlugin = require('progress-bar-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { AngularCompilerPlugin, AotPlugin }= require('@ngtools/webpack');
const root = helpers.getPath("");

console.log("[DEBUG]::BuildPath: " + helpers.getPath(ProdAOTConfig.buildPath + "/" + ProdAOTConfig.urlAppContext));
console.log("[DEBUG]::PublicPath: " + ProdAOTConfig.serverURL + ProdAOTConfig.urlAppContext);

const nodeExternals = require('webpack-node-externals');

const AOTConfig = {
    // ---------------------------------------------------------------------
  stats: {
    // ---------------------------------------------------------------------
     entrypoints: true
    , modules: true
    , modulesSort: "name"
    , maxModules: 200
    , excludeModules: [/node_modules/, /webpack/]
    , publicPath: true
    , children: true
  }
  // , externals: nodeExternals()
  // ---------------------------------------------------------------------
  , context: root
  // ---------------------------------------------------------------------
  , entry: {
    // ---------------------------------------------------------------------
      app: helpers.getPath('src/client/web.main')
    , vendor: helpers.getPath('src/client/vendor')
    , polyfills: helpers.getPath('polyfills')
  }
  // ---------------------------------------------------------------------
  , output: {
    // ---------------------------------------------------------------------
    // // REMEMBER: path via gulp-wepack-stream goes in gulp task , but set here
    path: helpers.getPath(ProdAOTConfig.buildPath + "/" + ProdAOTConfig.urlAppContext)
    , publicPath: ProdAOTConfig.serverURL + ProdAOTConfig.urlAppContext
    , filename: "js/[name].[hash].bundle.js"
    // , chunkFilename: "[name].[hash].bundle.js"
  }
  // ---------------------------------------------------------------------
  , resolve: { extensions: ['.ts', '.tsx', '.js'] }
  // ---------------------------------------------------------------------
  , plugins: [
      // ---------------------------------------------------------------------
      new ProgressPlugin()
    , new webpack.ContextReplacementPlugin(
        //  Workaround for angular/angular#11580
        // WARNING in ./node_modules/@angular/core/@angular/core.es5.js
        // Critical dependency: the request of a dependency is an expression
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(@angular|esm5)/
        , helpers.getPath('src')
      )
    , new HtmlWebpackPlugin({
        inject: false
        , template: helpers.getPath('config/webpack/index.ejs')
        , title: 'App -Web V2'
        , filename: 'index.html'
    })
  , new AngularCompilerPlugin({
        tsConfigPath: helpers.getPath('tsconfig.json')
        // , mainPath: helpers.getPath('src/client/web.main.ts')  // will auto-detect the root NgModule.
        // , entryModule: helpers.getPath('src/client/web.module#AppComponent')
        , skipCodeGeneration: false // true gives a JIT build; false is AOT build
        , strictMetadataEmit: true // Report syntax errors - no .metadata.json

    })
  ]
  // ---------------------------------------------------------------------
  , module: {
    // ---------------------------------------------------------------------
    rules: [
      // // ============== TS
        { test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/
          // , use: ['awesome-typescript-loader', 'angular2-template-loader' ]
          , loader: '@ngtools/webpack'
          // , sourcemap:true --- does not work
        }
      // ============  Embed files
      , { test: /\.html$/ , loader: "raw-loader" , exclude: /\.async\.html$/ }
      // CSS LOADER
      , { test: /\.css$/ , loader: ['css-loader'] }
    ]//=== END rules
  }
} // ============ END OF CONFIG ============================================

// console.log(AOTConfig)

export default AOTConfig;
