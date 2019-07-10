import { TestBed } from '@angular/core/testing';

import { NotifyApiService } from './notify-api.service';

describe('NotifyApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotifyApiService = TestBed.get(NotifyApiService);
    expect(service).toBeTruthy();
  });
});
