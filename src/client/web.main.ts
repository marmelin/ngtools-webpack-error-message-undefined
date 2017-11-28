/*
############################################
    W E B . M A I N .ts
############################################
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';

/* ====================================================
 *   BOOTSTRAP the application
 * ====================================================
 */
platformBrowserDynamic().bootstrapModule(WebModule /*, options*/)
  .catch(err => console.log(err));
