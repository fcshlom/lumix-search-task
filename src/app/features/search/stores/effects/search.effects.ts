import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';

import { GithubService } from '../../services/github.service';
import {
  runSearch,
  searchEmpty,
  searchFailure,
  searchFoundInStateSuccess,
  searchSuccess,
} from '../actions/search.actions';
import { Store } from '@ngrx/store';
import { selectSearchQueries } from '../selectors/search.selectors';
import { QueryObj } from '../../models/query-obj';

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private githubService: GithubService
  ) {}

  runSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(runSearch),
      debounceTime(500),
      withLatestFrom(this.store.select(selectSearchQueries)),
      switchMap(([action, queriesFromState]) => {
        if (action.query === '') {
          return of(searchEmpty);
        }
        if (
          queriesFromState?.some(
            (q) =>
              q.queryText === action.query &&
              q.page === action.page &&
              q.size === action.size
          )
        ) {
          const query = queriesFromState.find(
            (q) =>
              q.queryText === action.query &&
              q.page === action.page &&
              q.size === action.size
          )!;
          return of(searchFoundInStateSuccess({ query }));
        } else
          return this.githubService
            .searchRepositories(action.query, action.page, action.size)
            .pipe(
              map((responce) => {
                const results: QueryObj = {
                  queryText: action.query,
                  page: action.page,
                  size: action.size,
                  totalResults: responce.total_count,
                  items: responce.items,
                };
                if (responce.items.length === 0) return searchEmpty();
                return searchSuccess({ results });
              }),
              catchError((error) => of(searchFailure({ error })))
            );
      })
    )
  );
}
