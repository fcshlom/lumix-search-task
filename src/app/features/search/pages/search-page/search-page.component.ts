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

// Select the search results and loading state from the store
export class SearchPageComponent {
  results$ = this.store.select(selectSearchResults);
  isLoading$ = this.store.select(selectSearchLoading);

  // Initialize variables for suggestions, selected page and size, and query text
  suggestions$: Observable<string[]> = new Observable<string[]>();
  selectedPage: number = 1;
  selectedSize: number = 10;
  queryText: string = '';

  constructor(private store: Store) {}

  // Handler for search input changes
  onSearchChange(e: string) {
    this.queryText = e;
    if (!this.queryText || this.queryText === '') {
      // If query is empty, reset page and dispatch searchEmpty action
      this.selectedPage = 1;
      this.store.dispatch(searchEmpty());
    } else {
      // If query is not empty, run a search with the current query, page, and size
      this.runSearch(this.queryText, this.selectedPage, this.selectedSize);
    }
  }

  // Handler for page changes in pagination
  onPageChange(e: PageChanges) {
    this.selectedPage = e.pageIndex;
    this.selectedSize = e.pageSize;
    this.runSearch(this.queryText, this.selectedPage, this.selectedSize);
  }

  // Private method to dispatch a search action and update suggestions
  private runSearch(query: string, page: number, size: number) {
    // Dispatch runSearch action with provided query, page, and size
    this.store.dispatch(
      runSearch({ query, page: page || 1, size: size || 10 })
    );
    // Update suggestions by selecting autocomplete queries related to the current query
    this.suggestions$ = this.store.select(
      getAutocomplateQueries({ q: this.queryText })
    );
  }
}
