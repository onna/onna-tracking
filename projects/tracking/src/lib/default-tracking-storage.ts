import { TrackingStorage } from './tracking-storage';
import { TrackingData } from './tracking-data.model';
import { TrackingSessionData } from './tracking-session-data.model';

export class DefaultTrackingStorage implements TrackingStorage {

    sessionData?: TrackingSessionData;
    history: TrackingData[];

    constructor() {
        this.history = [];
    }

    save(data: TrackingData) {
        this.history.push(data);
    }

    saveSessionData(data: TrackingSessionData) {
        if (!!this.sessionData) {
            this.sessionData = data;
        }
    }

}
