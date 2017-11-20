import {TrackingStorage} from './track-me/tracking-storage';
import {TrackingData} from './track-me/tracking-data.model';
import {SessionData} from "./track-me/session-data.model";

export class AppTrackingStorage implements TrackingStorage {

    save(data: TrackingData) {
        console.log('App tracking storage');
        console.log(data);
    }

    saveSessionData(data: SessionData) {
        console.log(data);
    }

}
