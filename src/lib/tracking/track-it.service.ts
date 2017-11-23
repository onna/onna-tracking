import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { TrackingSessionData } from './tracking-session-data.model';
import { TrackingData } from './tracking-data.model';
import { TrackingStorage } from './tracking-storage';

@Injectable()
export class TrackItService {

    constructor(private router: Router,
                @Inject('TrackingStorage') private storage: TrackingStorage) {

        // Generate a session data with device type, resolution, browser, OS ...
        const sessionData = new TrackingSessionData({
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
