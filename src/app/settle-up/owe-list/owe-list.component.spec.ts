import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OweListComponent } from './owe-list.component';

describe('OweListComponent', () => {
  let component: OweListComponent;
  let fixture: ComponentFixture<OweListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OweListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OweListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
