import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAuthor, IBook } from '../../shared/interfaces/author.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
})
export class BookComponent {
  @Input() book!: IBook;
  @Input() isHandset: boolean | null = false;
  @Input() addNew: boolean = false;
  @Output() addNewBook$ = new EventEmitter();
  @Output() deleteBook$ = new EventEmitter();
  @Output() updateBook$ = new EventEmitter();
  oldBookState = {...this.book};
  isEditBook: boolean = false;

  deleteBook(book: IBook) {
    this.deleteBook$.emit(book);
  }

  addNewBook() {
    this.addNewBook$.emit(this.book);
  }
  updateBook() {
    this.updateBook$.emit({
      oldState: this.oldBookState,
      newState: this.book
    });
    this.isEditBook = false;
  }
}
