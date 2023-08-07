import { createAction, props } from '@ngrx/store';
import { SearchActions } from '../../enmus/search-actions';
import { QueryObj } from '../../models/query-obj';

export const runSearch = createAction(
  SearchActions.RUN_SEARCH,
  props<{ query: string; page: number; size: number }>()
);
export const searchSuccess = createAction(
  SearchActions.SEARCH_SUCCESS,
  props<{ results: QueryObj }>()
);
export const searchFoundInStateSuccess = createAction(
  SearchActions.SEARCH_FOUND_IN_STATE_SUCCESS,
  props<{ query: QueryObj }>()
);
export const searchFailure = createAction(
  SearchActions.SEARCH_FAILURE,
  props<{ error: any }>()
);
export const searchEmpty = createAction(SearchActions.SEARCH_EMPTY);
