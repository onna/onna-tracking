import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {TrackingStorage} from "../lib/tracking/tracking-storage";
import {Injectable, Type} from "@angular/core";
import {TrackItDirective} from "../lib/tracking/track-it.directive";
import {DefaultTrackingStorage} from "../lib/tracking/default-tracking-storage";
import {TrackingModule} from "../lib/tracking/tracking.module";
import {TrackItService} from "../lib/tracking/track-it.service";
import {AppTrackingStorage} from "./app.tracking-storage";
import {Router} from "@angular/router";
import {TrackingSessionData} from "../lib/tracking/tracking-session-data.model";
import {TrackingData} from "../lib/tracking/tracking-data.model";
import {BrowserModule} from "@angular/platform-browser";
import {APP_BASE_HREF} from "@angular/common";
import {RouterTestingModule} from '@angular/router/testing';

@Injectable()
class MyTrackingStorage implements TrackingStorage {

    sessionStorage: TrackingSessionData[] = [];
    storage: TrackingData[] = [];

    saveSessionData(data: TrackingSessionData) {
        this.sessionStorage.push(data);
    }

    save(data: TrackingData) {
        this.storage.push(data);
    }
}


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            BrowserModule,
            RouterTestingModule,
            TrackingModule.storage(MyTrackingStorage)
        ],
      declarations: [
          AppComponent
      ],
        providers: [{provide: 'TrackingStorage', useClass : MyTrackingStorage }, {provide: APP_BASE_HREF, useValue: '/'}]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should have a button testing area', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      //fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.button-events-test')).toBeTruthy();
      // const app = fixture.debugElement.componentInstance;
  }));

  // If we click one of the buttons, the storage-service has to record it.
    it('should track a button click', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();

        const buttons = fixture.debugElement.nativeElement.querySelector('.button1');
        expect(buttons).toBeTruthy();
        buttons.click();

        const trackingStorage = fixture.debugElement.injector.get('TrackingStorage');
        expect(trackingStorage).toBeTruthy();
        expect(trackingStorage.storage).toBeTruthy();
        expect(trackingStorage.storage.length).toBe(1);
    }));

    it('should have a form testing area', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.form-events-test')).toBeTruthy();
    }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  // }));
});
