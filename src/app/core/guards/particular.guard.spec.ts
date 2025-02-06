import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { particularGuard } from './particular.guard';

describe('particularGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => particularGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
