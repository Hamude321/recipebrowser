import { TestBed } from '@angular/core/testing';

import { RecipesFirestoreService } from './recipes-firestore.service';

describe('RecipesFirestoreService', () => {
  let service: RecipesFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipesFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
