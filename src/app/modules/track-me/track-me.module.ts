import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TrackMeDirective } from './track-me.directive';
import { TrackMeService } from './track-me.service';
import { DefaultTrackingStorage } from './default-tracking-storage';

const PROVIDERS = [
    TrackMeService,
    {
        provide: 'TrackingStorage',
        useClass: DefaultTrackingStorage
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot([])
    ],
    declarations: [
        TrackMeDirective
    ],
    exports: [
        TrackMeDirective
    ],
    providers: PROVIDERS
})
export class TrackMeModule {

    static storage(storage: any) {
        return {
            ngModule: TrackMeModule,
            providers: [
                {
                    provide: 'TrackingStorage',
                    useClass: storage
                }
            ]
        };
    }
}
