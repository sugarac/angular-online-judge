import { TestBed, inject } from '@angular/core/testing';

import { InputService } from './input.service';

describe('InputService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InputService]
    });
  });

  it('should ...', inject([InputService], (service: InputService) => {
    expect(service).toBeTruthy();
  }));
});
