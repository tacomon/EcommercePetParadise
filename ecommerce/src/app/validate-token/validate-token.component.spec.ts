import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateTokenComponent } from './validate-token.component';

describe('ValidateTokenComponent', () => {
  let component: ValidateTokenComponent;
  let fixture: ComponentFixture<ValidateTokenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidateTokenComponent]
    });
    fixture = TestBed.createComponent(ValidateTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
