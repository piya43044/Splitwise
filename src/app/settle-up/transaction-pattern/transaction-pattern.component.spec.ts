import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionPatternComponent } from './transaction-pattern.component';

describe('TransactionPatternComponent', () => {
  let component: TransactionPatternComponent;
  let fixture: ComponentFixture<TransactionPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionPatternComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
