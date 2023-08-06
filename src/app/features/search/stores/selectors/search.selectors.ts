import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from '../../models/search-state';

export const selectSearchState = createFeatureSelector<SearchState>('search');

export const selectSearchLoading = createSelector(
  selectSearchState,
  (state) => state.loading
);

export const selectSearchError = createSelector(
  selectSearchState,
  (state) => state.error
);

export const selectSearchQueries = createSelector(
  selectSearchState,
  (state) => state.queries
);

export const getAutocomplateQueries = (props: { q: string }) =>
  createSelector(selectSearchState, (state) =>
    state.queries
      .filter((q) => props.q !== '' && q.queryText.includes(props.q))
      .map((q) => q.queryText)
      .reduce(
        (acc: string[], char: string) =>
          acc.includes(char) ? acc : [...acc, char],
        []
      )
  );

export const selectSearchResults = createSelector(
  selectSearchState,
  (state) => state.lastQuery
);
