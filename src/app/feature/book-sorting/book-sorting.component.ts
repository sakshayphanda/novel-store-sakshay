import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipSelectionChange, MatChipsModule } from '@angular/material/chips';
import { sortByTitle, sortByYear } from '../../shared/utils/sort.utils';
import { Book } from '../../shared/enums/author.enum';

@Component({
	selector: 'app-book-sorting',
	standalone: true,
	imports: [CommonModule, MatChipsModule],
	templateUrl: './book-sorting.component.html',
	styleUrl: './book-sorting.component.scss',
})
export class BookSortingComponent {
  sortFunction!: Function | null;
  defaultSelection= true;
  Book=Book;
  @Output() sortFunction$: any = new EventEmitter();
  sortBooksBy(sortBy: string, event: MatChipSelectionChange) {
    if (!event.selected) {
      this.setSortFunction(null);
      return;
    }
    switch (sortBy) {
      case Book.title:
        this.setSortFunction(sortByTitle(sortBy));
        break;
      case Book.publishDate:
        this.setSortFunction(sortByYear(sortBy));
        break;
      default:
        break;
    }
  }

  setSortFunction(sortFunction: Function | null) {
    this.sortFunction = sortFunction;
    this.sortFunction$.emit(this.sortFunction);
  }
}
