import { SearchResultItem } from './search-result-item';

export interface SearchResults {
  query: string;
  total_count: number;
  incomplete_results: boolean;
  items: SearchResultItem[];
}
