import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPRojectComponent } from './add-new-project.component';

describe('AddNewPRojectComponent', () => {
  let component: AddNewPRojectComponent;
  let fixture: ComponentFixture<AddNewPRojectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewPRojectComponent]
    });
    fixture = TestBed.createComponent(AddNewPRojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
