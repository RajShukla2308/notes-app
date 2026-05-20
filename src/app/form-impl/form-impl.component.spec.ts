import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormImplComponent } from './form-impl.component';

describe('FormImplComponent', () => {
  let component: FormImplComponent;
  let fixture: ComponentFixture<FormImplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormImplComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormImplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
