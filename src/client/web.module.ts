/*
############################################
    W E B . M O D U L E .ts
############################################

 Module defenitions for main-web.ts */
// === ANGULAR =====
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// app
import { APP_COMPONENTS, AppComponent } from './app/components/index.components';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ APP_COMPONENTS ],
  bootstrap: [ AppComponent ]
})

export class WebModule { }
