/*
############################################
    A P P . C O M P O N E N T .ts
############################################
*/
// == libs
import { Component } from '@angular/core';

/*
 * This class represents the main application component.
 *
 */
@Component ({
  // module.id is a number in webpack so we need to convert
   moduleId: module.id.toString()
  , selector: 'aslingo-app'
  // Use with angular2-template-loader, because webpack does not resolve
  // relatives paths.
  , templateUrl: 'app.component.html'
  , styleUrls: ['app.component.css']
})

export class AppComponent {
  title = 'Message is undefinted - error ngtools';
}
