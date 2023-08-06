import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
})
export class SearchFieldComponent {
  searchText: string = '';
  searchTextControl = new FormControl('', [
    Validators.pattern('^[a-zA-Z0-9]*$'),
  ]);

  @ViewChild(MatAutocomplete) auto!: MatAutocomplete;

  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Input() suggestions$: Observable<string[]> = new Observable<string[]>();

  constructor() {}

  onSearchChange() {
    this.onSearch.emit(this.searchTextControl.value || '');
  }

  // prevent non AlphaNumeric chars - security prespective
  onKeyPress(event: KeyboardEvent) {
    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  onOptionSelected(event: any) {
    this.onSearch.emit(event.option.value);
  }
}
