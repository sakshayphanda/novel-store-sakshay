import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { Observable, Subject, map, shareReplay, takeUntil } from 'rxjs';
import { IAuthor, IBook } from '../../shared/interfaces/author.interface';
import { SortPipe } from '../../shared/pipes/sort.pipe';
import { Book } from '../../shared/enums/author.enum';
import { sortByTitle, sortByYear } from '../../shared/utils/sort.utils';
import { BookComponent } from '../book/book.component';
import {
  MatChipSelectionChange,
  MatChipsModule,
} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { BooksContainerComponent } from '../books-container/books-container.component';

@Component({
  selector: 'app-dynamic-content',
  standalone: true,
  imports: [
    CommonModule,
    SortPipe,
    BooksContainerComponent,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './dynamic-content.component.html',
  styleUrl: './dynamic-content.component.scss',
})
export class DynamicContentComponent {
  dataService = inject(DataService);
  originalAuthorData!: IAuthor;
  sortFunction!: Function | null;
  authorData!: IAuthor;
  unsubscribeSubject: Subject<boolean> = new Subject<boolean>();
  defaultSelection: boolean = true;
  private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Tablet, Breakpoints.Handset])
    .pipe(map((result: BreakpointState) => result.matches));
  ngOnInit() {
    this.dataService
      .getData()
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe((authorData) => (this.authorData = authorData));
  }

  sortBooksBy(sortBy: string, event: MatChipSelectionChange) {
    if (!event.selected) {
      this.sortFunction = null;
      return;
    }
    if (sortBy === Book.title) this.sortFunction = sortByTitle(sortBy);
    else if (sortBy === Book.publishDate)
      this.sortFunction = sortByYear(sortBy);
  }

  ngOnDestroy() {
    this.unsubscribeSubject.next(true);
  }
}
