import { TestBed } from '@angular/core/testing';

import { LuvToShopFormService } from './luv-to-shop-form.service';

describe('LuvToShopFormService', () => {
  let service: LuvToShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LuvToShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
