import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortPipe } from '../../shared/pipes/sort.pipe';
import { BookComponent } from '../book/book.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IAuthor, IBook } from '../../shared/interfaces/author.interface';

@Component({
	selector: 'app-books-container',
	standalone: true,
	imports: [
		CommonModule,
		SortPipe,
		BookComponent,
		MatButtonModule,
		MatIconModule,
		MatTooltipModule,
	],
	templateUrl: './books-container.component.html',
	styleUrl: './books-container.component.scss',
})
export class BooksContainerComponent {
	@Input() authorData!: IAuthor;
	@Input() isHandset!: boolean | null;
	@Input() sortFunction!: Function | null;
	addBookContainer!: boolean;
	newBook: IBook = {} as IBook;

	addNewBook($event: IBook) {
		this.addBookContainer = false;
		let books: IBook[] = this.authorData.data.books;
		books.unshift($event);
		this.newBook = {} as IBook;
	}

	deleteBook(book: IBook) {
		const index = this.findIndexFromBook(book);
		this.authorData.data.books.splice(index, 1);
	}

	updateBook(event: any) {
		let books: IBook[] = this.authorData.data.books;
		const index = this.findIndexFromBook(event.oldBookState);
		books[index] = event.newState;
	}

	findIndexFromBook(book: IBook) {
		let books: IBook[] = this.authorData.data.books;
		return books.findIndex((i) => i.title === book.title);
	}
}
