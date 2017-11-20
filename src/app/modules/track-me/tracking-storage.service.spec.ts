import { TestBed, inject } from '@angular/core/testing';

import { TrackingStorageService } from './default-tracking-storage';

describe('TrackingStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrackingStorageService]
    });
  });

  it('should be created', inject([TrackingStorageService], (service: TrackingStorageService) => {
    expect(service).toBeTruthy();
  }));
});
