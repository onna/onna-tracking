export class TrackingData {

    element: string;
    route: string;

    timestamp: number;

    x: number;
    y: number;

    width: number;
    height: number;

    constructor(data: any = {}) {
        this.element = data.element;
        this.route = data.route;
        this.timestamp = data.timestamp;
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
    }

}
