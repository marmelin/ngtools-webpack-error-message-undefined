'use strict'
import * as path from 'path';

function getPath(subdirs?: string) :string {
      if ( ! (!!subdirs) || ! (!!subdirs.trim()) ) {
        subdirs = '/';
      }
      /*
      console.log("PATHS::" + __dirname);
      console.log("RESOLVED PATH= "
            +path.resolve(__dirname,  '../../../' + subdirs));
            */
      return path.resolve(__dirname, '../../../' + subdirs);
}

export { getPath }
