import { TestBed, inject } from '@angular/core/testing';

import { LocationsService } from './locations.service';

describe('LocationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationsService]
    });
  });

  it('should be created', inject([LocationsService], (service: LocationsService) => {
    expect(service).toBeTruthy();
  }));
});
