import {TrackingData} from './tracking-data.model';
import {SessionData} from './session-data.model';

export interface TrackingStorage {

    saveSessionData(data: SessionData);
    save(data: TrackingData);

}
