import { createReducer, on } from '@ngrx/store';
import { SearchState } from '../../models/search-state';
import {
  runSearch,
  searchEmpty,
  searchFailure,
  searchFoundInStateSuccess,
  searchSuccess,
} from '../actions/search.actions';
import { QueryObj } from '../../models/query-obj';

export const initLastQueryState: QueryObj = {
  queryText: '',
  page: 0,
  size: 0,
  totalResults: 0,
  items: [],
};

export const initialState: SearchState = {
  queries: [],
  loading: false,
  error: null,
  lastQuery: initLastQueryState,
};

export const searchReducer = createReducer(
  initialState,
  on(runSearch, (state, { query }) => ({ ...state, loading: true })),
  on(searchFoundInStateSuccess, (state, { query }) => ({
    ...state,
    error: null,
    lastQuery: query,
    loading: false,
  })),
  on(searchSuccess, (state, { results }) => {
    return {
      ...state,
      loading: false,
      error: null,
      lastQuery: results,
      queries: [...state.queries, results],
    };
  }),
  on(searchFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(searchEmpty, (state, {}) => ({
    ...state,
    lastQuery: initLastQueryState,
    error: null,
    loading: false,
  }))
);
