import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { SearchResults } from '../models/search-results';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private apiUrl = 'https://api.github.com/search/repositories';

  constructor(private http: HttpClient) {}

  searchRepositories(
    query: string,
    page: number,
    pageSize: number
  ): Observable<SearchResults> {
    const params = {
      q: query,
      per_page: pageSize.toString(),
      page: page.toString(),
    };
    return this.http
      .get<any>(this.apiUrl, { params })
      .pipe(catchError(this.handleError));
  }

  // Error handling

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred while fetching data.';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
      return throwError(() => new Error(errorMessage));
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      // Return an observable that emits the error message
      return throwError(() => new Error(errorMessage));
    }
  }
}
