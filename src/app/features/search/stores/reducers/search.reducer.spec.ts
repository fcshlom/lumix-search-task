import {
  searchReducer,
  initialState,
  initLastQueryState,
} from './search.reducer';
import {
  runSearch,
  searchFoundInStateSuccess,
  searchSuccess,
  searchFailure,
  searchEmpty,
} from '../actions/search.actions';

describe('Search Reducer', () => {
  it('should set loading to true on runSearch', () => {
    const initialStateCopy = { ...initialState };
    const newState = searchReducer(
      initialState,
      runSearch({ query: 'sample query', page: 1, size: 10 })
    );
    expect(newState.loading).toBe(true);
    expect(newState).toEqual({ ...initialStateCopy, loading: true });
  });

  it('should set loading to false and update state on searchFoundInStateSuccess', () => {
    const stateWithLoading = { ...initialState, loading: true };
    const query = {
      queryText: 'test',
      page: 1,
      size: 10,
      totalResults: 20,
      items: [],
    };
    const newState = searchReducer(
      stateWithLoading,
      searchFoundInStateSuccess({ query })
    );
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
    expect(newState.lastQuery).toEqual(query);
  });

  it('should set loading to false and update state on searchSuccess', () => {
    const stateWithLoading = { ...initialState, loading: true };
    const results = {
      queryText: 'test',
      page: 1,
      size: 10,
      totalResults: 20,
      items: [],
    };
    const newState = searchReducer(
      stateWithLoading,
      searchSuccess({ results })
    );
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
    expect(newState.lastQuery).toEqual(results);
    expect(newState.queries).toEqual([results]);
  });

  it('should set loading to false and update state on searchFailure', () => {
    const stateWithLoading = { ...initialState, loading: true };
    const error = 'An error occurred.';
    const newState = searchReducer(stateWithLoading, searchFailure({ error }));
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error);
  });

  it('should reset state on searchEmpty', () => {
    const stateWithValues = {
      ...initialState,
      loading: true,
      lastQuery: {
        queryText: 'test',
        page: 1,
        size: 10,
        totalResults: 20,
        items: [],
      },
      error: 'An error occurred.',
    };
    const newState = searchReducer(stateWithValues, searchEmpty());
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
    expect(newState.lastQuery).toEqual(initLastQueryState);
  });
});
