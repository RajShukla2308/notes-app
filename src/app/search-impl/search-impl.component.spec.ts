import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchImplComponent } from './search-impl.component';

describe('SearchImplComponent', () => {
  let component: SearchImplComponent;
  let fixture: ComponentFixture<SearchImplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchImplComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchImplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
