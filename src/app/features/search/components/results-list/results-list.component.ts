import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SearchResultItem } from '../../models/search-result-item';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsListComponent {
  @Input() resultsItems: SearchResultItem[] = [];
}
