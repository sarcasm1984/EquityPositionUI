import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecuteTradeComponent } from './execute-trade.component';

describe('ExecuteTradeComponent', () => {
  let component: ExecuteTradeComponent;
  let fixture: ComponentFixture<ExecuteTradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecuteTradeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecuteTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
