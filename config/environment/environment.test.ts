import { BaseConfig } from './environment.base.config';
import * as path from 'path';


const TestConfig = BaseConfig;

TestConfig.e2eConfigPath = path.resolve(
  BaseConfig.rootPath, 'config/test-environment/'
);

TestConfig.unitsConfigPath = path.resolve(
  BaseConfig.rootPath, 'config/test-environment/mocha'
);

console.log("DEVCONFGI=" + TestConfig.unitsConfigPath);

export { TestConfig };
