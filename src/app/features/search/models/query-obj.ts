import { SearchResultItem } from './search-result-item';

export interface QueryObj {
  queryText: string;
  page: number;
  size: number;
  totalResults: number;
  items: SearchResultItem[];
}
