import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TrackingModule } from 'projects/tracking/src/public_api';
import { AppTrackingStorage } from './storage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([]),
    TrackingModule.storage(AppTrackingStorage),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
