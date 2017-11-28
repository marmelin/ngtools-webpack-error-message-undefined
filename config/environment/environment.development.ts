import { BaseConfig } from './environment.base.config';
import * as path from 'path';


const DevConfig = BaseConfig;

DevConfig.e2eConfigPath = path.resolve(
  BaseConfig.rootPath, 'config/test-environment/'
);


DevConfig.unitsConfigPath = path.resolve(
  BaseConfig.rootPath, 'config/test-environment/'
);

  console.log("DEVCONFGI=" + DevConfig.unitsConfigPath);

export { DevConfig };
