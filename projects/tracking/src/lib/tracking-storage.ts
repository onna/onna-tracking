import { TrackingSessionData } from './tracking-session-data.model';
import { TrackingData } from './tracking-data.model';

/**
 * Contains all the front-end / back-end operations.
 */
export interface TrackingStorage {

    saveSessionData(data: TrackingSessionData);
    save(data: TrackingData);

}
