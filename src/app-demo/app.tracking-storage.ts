import {TrackingStorage} from '../lib/tracking/tracking-storage';
import {TrackingSessionData} from '../lib/tracking/tracking-session-data.model';
import {TrackingData} from '../lib/tracking/tracking-data.model';

export class AppTrackingStorage implements TrackingStorage {

    saveSessionData(data: TrackingSessionData) {
        console.log(data);
    }

    save(data: TrackingData) {
        console.log(data);
    }

}
