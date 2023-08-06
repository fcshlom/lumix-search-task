import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { runSearch, searchEmpty } from '../../stores/actions/search.actions';
import {
  getAutocomplateQueries,
  selectSearchLoading,
  selectSearchResults,
} from '../../stores/selectors/search.selectors';
import { Observable } from 'rxjs';
import { PageChanges } from 'src/app/shared/models/page-changes';

@Component({
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent {
  results$ = this.store.select(selectSearchResults);
  isLoading$ = this.store.select(selectSearchLoading);
  suggestions$: Observable<string[]> = new Observable<string[]>();
  selectedPage: number = 1;
  selectedSize: number = 10;
  queryText: string = '';

  constructor(private store: Store) {}

  onSearchChange(e: string) {
    this.queryText = e;
    if (!this.queryText || this.queryText === '') {
      this.selectedPage = 1;
      this.store.dispatch(searchEmpty());
    } else {
      this.runSearch(this.queryText, this.selectedPage, this.selectedSize);
    }
  }

  onPageChange(e: PageChanges) {
    this.selectedPage = e.pageIndex;
    this.selectedSize = e.pageSize;
    this.runSearch(this.queryText, this.selectedPage, this.selectedSize);
  }

  private runSearch(query: string, page: number, size: number) {
    this.store.dispatch(
      runSearch({ query, page: page || 1, size: size || 10 })
    );
    this.suggestions$ = this.store.select(
      getAutocomplateQueries({ q: this.queryText })
    );
  }
}
