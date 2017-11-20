import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {TrackingData} from './tracking-data.model';
import {TrackMeService} from './track-me.service';

@Directive({
    selector: '[trackMe]'
})
export class TrackMeDirective implements OnInit {

    @Input() trackMe: string;

    constructor(private elementRef: ElementRef,
                private renderer: Renderer2,
                private service: TrackMeService) {
    }

    ngOnInit() {
        console.log('Tracking: ' + this.trackMe);
        this.renderer.listen(this.elementRef.nativeElement, 'click', this.trackClickEvent());
    }

    private trackClickEvent() {
        const self = this;

        return ($event) => {
            const data = new TrackingData({
                element: self.trackMe,
                route: self.service.getCurrentRoute(),
                x: <number> $event['x'],
                y: <number> $event['y'],
                width: window.innerWidth,
                height: window.innerHeight,
                timestamp: Date.now()
            });

            self.service.save(data);
        };
    }
}
