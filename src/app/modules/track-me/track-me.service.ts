import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TrackingStorage } from './tracking-storage';
import { SessionData } from './session-data.model';
import { TrackingData } from './tracking-data.model';

@Injectable()
export class TrackMeService {

    constructor(private router: Router,
                @Inject('TrackingStorage') private storage: TrackingStorage) {

        // Generate a session start data with the device type, device screen resolution, browser, OS ...
        const sessionData = new SessionData({
            width: window.screen.width,
            height: window.screen.height,
            os: window.navigator.platform,
            browser: window.navigator.userAgent
        });

        this.storage.saveSessionData(sessionData);
    }

    getCurrentRoute(): string {
        const queryStart = this.router.url.indexOf('?');
        if (queryStart >= 0) {
            return this.router.url.substring(0, queryStart);
        }

        return this.router.url;
    }

    save(data: TrackingData) {
        this.storage.save(data);
    }

}
