import { TestBed } from '@angular/core/testing';

import { VegetableCRUDService } from './vegetable-crud.service';

describe('VegetableCRUDService', () => {
  let service: VegetableCRUDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VegetableCRUDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
