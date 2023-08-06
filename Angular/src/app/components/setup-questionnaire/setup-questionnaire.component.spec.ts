import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupQuestionnaireComponent } from './setup-questionnaire.component';

describe('SetupQuestionnaireComponent', () => {
  let component: SetupQuestionnaireComponent;
  let fixture: ComponentFixture<SetupQuestionnaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetupQuestionnaireComponent]
    });
    fixture = TestBed.createComponent(SetupQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
