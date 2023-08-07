import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PageChanges } from '../../models/page-changes';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  pageSizeOptions: number[] = [5, 10, 25, 50]; // Options for items per page

  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @Output() pageChange: EventEmitter<PageChanges> =
    new EventEmitter<PageChanges>();

  onPageChange(e: any) {
    const pageChange: PageChanges = {
      pageIndex: e.pageIndex,
      pageSize: e.pageSize,
    };
    this.pageChange.emit(pageChange);
  }
}
