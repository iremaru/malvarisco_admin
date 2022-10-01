import { TestBed } from '@angular/core/testing';

import { VegetablePartCRUDService } from './vegetable-part-crud.service';

describe('VegetablePartCRUDService', () => {
  let service: VegetablePartCRUDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VegetablePartCRUDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
