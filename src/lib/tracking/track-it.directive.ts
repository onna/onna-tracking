import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { TrackingData } from './tracking-data.model';
import { TrackItService } from './track-it.service';

@Directive({
    selector: '[trackIt]'
})
export class TrackItDirective implements OnInit {

    @Input() trackIt: string;

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private service: TrackItService,
    ) {
    }

    ngOnInit() {
        if (typeof this.elementRef.nativeElement.submit === 'function') {
            this.renderer.listen(this.elementRef.nativeElement, 'submit', this.trackClickEvent());
        } else {
            this.renderer.listen(this.elementRef.nativeElement, 'click', this.trackClickEvent());
        }
    }

    private trackClickEvent() {
        const self = this;

        return ($event) => {
            const data = new TrackingData({
                element: self.trackIt,
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
