import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TrackingModule } from '../lib/tracking/tracking.module';
import {TrackItService} from "../lib/tracking/track-it.service";
import {DefaultTrackingStorage} from "../lib/tracking/default-tracking-storage";
import {AppTrackingStorage} from "./app.tracking-storage";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        TrackingModule.storage(AppTrackingStorage)
        // TrackingModule
    ],
    exports: [],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
