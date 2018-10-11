import { TestBed, inject } from '@angular/core/testing';

import { GeoCodeService } from './geo-code.service';

describe('GeoCodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoCodeService]
    });
  });

  it('should be created', inject([GeoCodeService], (service: GeoCodeService) => {
    expect(service).toBeTruthy();
  }));
});
