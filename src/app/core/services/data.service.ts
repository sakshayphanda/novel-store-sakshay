import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthor } from '../../shared/interfaces/author.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  getData(): Observable<IAuthor> {
    return this.httpClient.get<IAuthor>(
      'https://s3.amazonaws.com/api-fun/books.json'
    );
  }
}
