import { TestBed } from '@angular/core/testing';

import { SharedataService } from './sharedata.service';

describe('SharedataService', () => {
  let service: SharedataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit the message', () => {
    service.setMessage('Hello');
    service.message$.subscribe(message => {
      expect(message).toBe('Hello');
    })
  })
});
