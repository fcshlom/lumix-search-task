import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SearchResultItem } from '../../models/search-result-item';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultCardComponent {
  initItem: SearchResultItem = {
    name: '',
    description: '',
    watchers: 0,
    html_url: '',
    forks: 0,
    stargazers_count: 0,
    owner: undefined,
  };
  @Input() resultData: SearchResultItem = this.initItem;
}
