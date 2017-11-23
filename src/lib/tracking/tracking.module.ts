import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DefaultTrackingStorage } from './default-tracking-storage';
import { TrackItDirective } from './track-it.directive';
import { TrackItService } from './track-it.service';

const PROVIDERS = [
    TrackItService,
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
        TrackItDirective
    ],
    exports: [
        TrackItDirective
    ],
    providers: PROVIDERS
})
export class TrackingModule {

    static storage(storage: any) {
        return {
            ngModule: TrackingModule,
            providers: [
                {
                    provide: 'TrackingStorage',
                    useClass: storage
                }
            ]
        };
    }
}
