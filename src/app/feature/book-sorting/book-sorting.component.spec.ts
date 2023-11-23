import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSortingComponent } from './book-sorting.component';

describe('BookSortingComponent', () => {
  let component: BookSortingComponent;
  let fixture: ComponentFixture<BookSortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookSortingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
