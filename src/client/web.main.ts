/*
############################################
    W E B . M A I N .ts
############################################
*/
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { platformBrowser} from '@angular/platform-browser';
import {enableProdMode} from '@angular/core';

import { WebModule } from './web.module';

platformBrowserDynamic().bootstrapModule(WebModule);
// platformBrowser().bootstrapModule(WebModule /*, options*/);
  // .catch(err => console.log(err));
