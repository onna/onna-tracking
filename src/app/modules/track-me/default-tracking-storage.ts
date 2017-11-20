import { TrackingStorage } from './tracking-storage';
import { TrackingData } from './tracking-data.model';
import {SessionData} from './session-data.model';

export class DefaultTrackingStorage implements TrackingStorage {

    sessionData: SessionData;
    history: TrackingData[];

    constructor() {
        this.history = [];
    }

    save(data: TrackingData) {
        console.log(data);
        this.history.push(data);
    }

    saveSessionData(data: SessionData) {
        console.log(data);
        this.sessionData = data;
    }

}
