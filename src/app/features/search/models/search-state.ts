import { QueryObj } from './query-obj';

export interface SearchState {
  queries: QueryObj[];
  loading: boolean;
  error: string | null;
  lastQuery: QueryObj;
}
