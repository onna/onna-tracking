import { TrackingStorage } from './tracking-storage';
import { TrackingData } from './tracking-data.model';
import { TrackingSessionData } from './tracking-session-data.model';

export class DefaultTrackingStorage implements TrackingStorage {

    sessionData: TrackingSessionData;
    history: TrackingData[];

    constructor() {
        this.history = [];
    }

    save(data: TrackingData) {
        console.log(data);
        this.history.push(data);
    }

    saveSessionData(data: TrackingSessionData) {
        console.log(data);
        this.sessionData = data;
    }

}
