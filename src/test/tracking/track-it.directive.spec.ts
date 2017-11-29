import {APP_BASE_HREF} from '@angular/common';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement, Injectable} from '@angular/core';
import {By, BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {TrackItService} from '../../lib/tracking/track-it.service';
import {TrackingModule} from '../../lib/tracking/tracking.module';
import {TrackingStorage} from '../../lib/tracking/tracking-storage';
import {TrackingSessionData} from '../../lib/tracking/tracking-session-data.model';
import {TrackingData} from '../../lib/tracking/tracking-data.model';

@Component({
    template: `
        <div>
            <button class="tracked-button" trackIt="test-button"></button>
            <button class="regular-button"></button>
        </div>
    `
})
class TestTrackItComponent {
}

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

describe('Directive: TrackIt', () => {

    let fixture: ComponentFixture<TestTrackItComponent>;
    let trackedButton: DebugElement;
    let regularButton: DebugElement;
    let trackingStorage: MyTrackingStorage;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                BrowserModule,
                TrackingModule.storage(MyTrackingStorage)
            ],
            declarations: [
                TestTrackItComponent
            ],
            providers: [
                TrackItService,
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        }).compileComponents();
    }));

    it('should store a session data on start-up', () => {
        // Before creating the components, no session data was stored.
        trackingStorage = TestBed.get('TrackingStorage');
        expect(trackingStorage.sessionStorage.length).toBe(0);

        // After creating the element, the session data is stored.
        fixture = TestBed.createComponent(TestTrackItComponent);
        fixture.detectChanges();
        expect(trackingStorage.sessionStorage.length).toBe(1);
    });

    it('should bind a click listener to the button', () => {
        fixture = TestBed.createComponent(TestTrackItComponent);
        trackedButton = fixture.debugElement.query(By.css('.tracked-button'));
        regularButton = fixture.debugElement.query(By.css('.regular-button'));
        fixture.detectChanges();

        // Regular buttons don't have a click listener.
        expect(regularButton.listeners.length).toBe(0);
        // Tracked buttons do have a click listener.
        expect(trackedButton.listeners.length).toBe(1);
    });

    it('should store tracking data on every click', () => {
        trackingStorage = TestBed.get('TrackingStorage');
        fixture = TestBed.createComponent(TestTrackItComponent);
        fixture.detectChanges();

        // Before clicking no tracking data was stored.
        expect(trackingStorage.storage.length).toBe(0);

        trackedButton = fixture.debugElement.query(By.css('.tracked-button'));
        trackedButton.nativeElement.click();

        // After clicking the tracking data is stored.
        expect(trackingStorage.storage.length).toBe(1);
    });

    it('should not store tracking data for regular buttons', () => {
        trackingStorage = TestBed.get('TrackingStorage');
        fixture = TestBed.createComponent(TestTrackItComponent);
        fixture.detectChanges();

        // Before clicking no tracking data was stored.
        expect(trackingStorage.storage.length).toBe(0);

        regularButton = fixture.debugElement.query(By.css('.regular-button'));
        regularButton.nativeElement.click();

        // After clicking no tracking data was stored.
        expect(trackingStorage.storage.length).toBe(0);
    });
});
