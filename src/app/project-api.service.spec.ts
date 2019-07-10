import { TestBed } from '@angular/core/testing';

import { ProjectApiService } from './project-api.service';

describe('ProjectApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectApiService = TestBed.get(ProjectApiService);
    expect(service).toBeTruthy();
  });
});
