import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateTokenLoginComponent } from './validate-token-login.component';

describe('ValidateTokenLoginComponent', () => {
  let component: ValidateTokenLoginComponent;
  let fixture: ComponentFixture<ValidateTokenLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidateTokenLoginComponent]
    });
    fixture = TestBed.createComponent(ValidateTokenLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
