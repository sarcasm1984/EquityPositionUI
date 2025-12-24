import { TestBed } from '@angular/core/testing';

import { MessageshareService } from './messageshare.service';

describe('MessageshareService', () => {
  let service: MessageshareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageshareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
