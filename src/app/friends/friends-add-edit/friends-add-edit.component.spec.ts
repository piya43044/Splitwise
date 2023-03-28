import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsAddEditComponent } from './friends-add-edit.component';

describe('FriendsAddEditComponent', () => {
  let component: FriendsAddEditComponent;
  let fixture: ComponentFixture<FriendsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
