'use strict'
import * as path from 'path';
import * as helpers from '../../tools/helpers/helper.index';
import { EnvConfig } from './env-config.interface';

console.log('ROOTPATH=' + helpers.getPath());

const BaseConfig: EnvConfig = {
    api: 'https://demo.com'
  , server : "localhost"
  , port : "3001"
  , proto : "http"
  , urlAppContext: "/app"
  , rootPath: helpers.getPath()
  , buildPath: helpers.getPath("build")
};

BaseConfig.serverURL = BaseConfig.proto
      + '://' + BaseConfig.server
      + ':' + BaseConfig.port


export { BaseConfig };
