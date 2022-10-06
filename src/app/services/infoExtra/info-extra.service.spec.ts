import { TestBed } from '@angular/core/testing';

import { InfoExtraService } from './info-extra.service';

describe('InfoExtraService', () => {
  let service: InfoExtraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoExtraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
