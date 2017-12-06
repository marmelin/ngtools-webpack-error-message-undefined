import * as webpack from 'webpack';
import * as path from 'path';
import * as fs from 'fs';
import * as helpers from '../../tools/helpers/helper.index';
import { ProdAOTConfig } from '../../config/environment/environment.aot-production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ProgressPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { AngularCompilerPlugin, AotPlugin }= require('@ngtools/webpack');
const root = helpers.getPath("");

console.log("[DEBUG]::BuildPath: " + helpers.getPath(ProdAOTConfig.buildPath + "/" + ProdAOTConfig.urlAppContext));
console.log("[DEBUG]::PublicPath: " + ProdAOTConfig.serverURL + ProdAOTConfig.urlAppContext);

const nodeExternals = require('webpack-node-externals');
const PurifyPlugin = require('@angular-devkit/build-optimizer').PurifyPlugin;
var CompressionPlugin = require("compression-webpack-plugin");


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
    path: helpers.getPath(ProdAOTConfig.buildPath + "/" + ProdAOTConfig.urlAppContext)
    , publicPath: ProdAOTConfig.serverURL + ProdAOTConfig.urlAppContext
    , filename: "js/[name].[hash].bundle.js"
    , chunkFilename: "js/[name].[hash].bundle.js"
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
    ,   new webpack.LoaderOptionsPlugin({ debug: true })
  , new AngularCompilerPlugin({
        tsConfigPath: helpers.getPath('tsconfig.json')
        /*
         * To get error "No Metadata" for AOT build comment out "mainPath" AND
         * "entryModule" and have skipCodeGeneration to false
         */
        /*
         * To get error "message undefined" for AOT build uncomment "mainPath"
         * and comment out "entryModule" and have skipCodeGeneration to false -
         * and give mainPath file web.module.ts instead of web.main.ts
         */
        , mainPath: helpers.getPath('src/client/web.main.ts')  // will auto-detect the root NgModule.
        // , entryModule: helpers.getPath('src/client/web.module#AppComponent')
        , skipCodeGeneration: false // true gives a JIT build; false is AOT build
        , strictMetadataEmit: true // Report syntax errors - no .metadata.json
        , sourcemap:true

    })
    , new ExtractTextPlugin({
        filename: "css/[name].[hash].styles.css"
       , allChunks: true
      })
    , new PurifyPlugin()
      , new webpack.optimize.UglifyJsPlugin({
              mangle: true,
              comments: false,
              compress: { warnings: false }
          })
    ,  new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
    })
 ]
  // ---------------------------------------------------------------------
  , module: {
    // ---------------------------------------------------------------------
    rules: [
      // // ============== TS
        { test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/
          , use: ['@angular-devkit/build-optimizer/webpack-loader','@ngtools/webpack' ]
        }
      // ============  Embed files
      , { test: /\.html$/ , loader: "raw-loader" , exclude: /\.async\.html$/ }

      // -------------- CSS LOADER - for components
      , { test: /\.css$/
        // ExtractTextPlugin CANNOT BE USED WITH AOT BUILD,
        // because it does not support ChildCompilation
        // ... "ExtractTextPlugin used without corresponding plugin"-error
        // So for the component css files use normal loader
          , use: ['css-to-string-loader'].concat('css-loader')
           }
      // -------------- CSS LOADER - for global css files
      , { test: /\.css$/
        /*
         * To get the error uncomment the aboave css section and the below
         * "include" line.
         */
        // only global css need to be extracted for performance loading in browser
          , include: helpers.getPath('src/client/styles')
          , use:['css-to-string-loader'].concat(
                ExtractTextPlugin.extract({
                      fallback: 'style-loader'
                    , use: ['css-loader']
                  })
                )
        }
    ]//=== END rules
  }
} // ============ END OF CONFIG ============================================

// console.log(AOTConfig)

export default AOTConfig;
