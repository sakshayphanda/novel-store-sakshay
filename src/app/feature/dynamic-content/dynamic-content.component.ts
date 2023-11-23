import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { Observable, Subject, map, shareReplay, takeUntil } from 'rxjs';
import { IAuthor } from '../../shared/interfaces/author.interface';
import { SortPipe } from '../../shared/pipes/sort.pipe';
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
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './dynamic-content.component.html',
  styleUrl: './dynamic-content.component.scss',
})
export class DynamicContentComponent {
  dataService = inject(DataService);
  authorData!: IAuthor;
  unsubscribeSubject: Subject<boolean> = new Subject<boolean>();
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

  ngOnDestroy() {
    this.unsubscribeSubject.next(true);
  }
}
