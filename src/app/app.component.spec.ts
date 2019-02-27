import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {
  TrackingStorage,
  TrackingModule,
  TrackingSessionData,
  TrackingData,
} from 'projects/tracking/src/public_api';
import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

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
                FormsModule,
                RouterTestingModule,
                TrackingModule.storage(MyTrackingStorage)
            ],
            declarations: [
                AppComponent
            ],
            providers: [{provide: 'TrackingStorage', useClass: MyTrackingStorage}, {provide: APP_BASE_HREF, useValue: '/'}]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should have a button testing area', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.button-events-test')).toBeTruthy();
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

    it(`should have as term 'app'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.term).toEqual('app');
    }));
});
