export class TrackingSessionData {

    width: number;
    height: number;

    os: string;
    browser: string;

    constructor(data: any = {}) {
        this.width = data.width;
        this.height = data.height;
        this.os = data.os;
        this.browser = data.browser;
    }

}
