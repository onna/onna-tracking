import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TrackMeModule } from './modules/track-me/track-me.module';
import { AppTrackingStorage } from './modules/app.tracking.storage';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        TrackMeModule.storage(AppTrackingStorage)
    ],
    exports: [],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
