import { TrackingStorage, TrackingData, TrackingSessionData } from 'projects/tracking/src/public_api';

export class AppTrackingStorage implements TrackingStorage {

    saveSessionData(data: TrackingSessionData) {
        console.log(data);
    }

    save(data: TrackingData) {
        console.log(data);
    }

}
