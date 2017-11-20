import { TestBed, inject } from '@angular/core/testing';

import { TrackMeService } from './track-me.service';

describe('TrackMeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrackMeService]
    });
  });

  it('should be created', inject([TrackMeService], (service: TrackMeService) => {
    expect(service).toBeTruthy();
  }));
});
