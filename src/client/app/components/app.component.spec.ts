import { getTestBed, ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
// import { DebugElement }    from '@angular/core';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { AppComponent } from './app.component';

// Angular doesn't depend on a specific testing framework. Testing frameworks
// however are not compatible with zone.js out of the box because they
// implement their own task scheduler in a way that doesn't mimic the browser
// scheduler. In fact if you don't use async or fakeAsync helpers then you
// can write tests in mocha.
//
// If you want async and fakeAsync goodness then you need to patch the test
// runner so that the tasks created from tests are executed correctly.

describe('1st test', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let server : any;

   beforeEach(() => {
      // server = sinon.fakeServer.create();
      // server.autoRespond = true;
      // server.respondWith("GET",
      //     "http://localhost:3001app/",
      //     [202,
      //         {"Content-Type": "application/html"},
      //         '[' +
      //         '{"originalTitle" :"The Hunger Games", "author" : "Suzanne Collins"},' +
      //         '{"originalTitle" :"Pride and Prejudice", "author" : "Jane Austen"},' +
      //         '{"originalTitle" :"The Chronicles of Narnia", "author" : "C.S. Lewis"}' +
      //         ']'
      //     ]
      // );
        TestBed.configureTestingModule({
          declarations: [AppComponent]
        })//.compileComponents();
      });

  // afterEach(() => {
  //           // server.restore();
  //           // getTestBed().resetTestingModule();
  // });

  it('true is true', () => { expect(true).to.equal(true); });

  it('should have title: Welcome to App -Web!', () => {
            let title : any;
            fixture = TestBed.createComponent(AppComponent);

            fixture.detectChanges();
            let de = fixture.debugElement;

            title = fixture.debugElement.query(By.css('div p.hello'));
            expect(title.nativeElement.textContent).to.equal('Welcome to ngtools error!');
            // expect(de.nativeElement.querySelector('div p.hello').textContent).contains('Welcome to App -Web!');
        });




});
