import { ComponentFixture, TestBed } from '@angular/core/testing';
import { runSearch, searchEmpty } from '../../stores/actions/search.actions';
import { SearchPageComponent } from './search-page.component';
import { Store } from '@ngrx/store';
import { PageChanges } from 'src/app/shared/models/page-changes';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { SearchFieldComponent } from '../../components/search-field/search-field.component';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { ResultsListComponent } from '../../components/results-list/results-list.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import {
  MatAutocomplete,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;
  let storeMock: jasmine.SpyObj<Store>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    storeMock = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatAutocompleteModule,
      ],
      declarations: [
        SearchPageComponent,
        SearchFieldComponent,
        LoaderComponent,
        ResultsListComponent,
        MatFormField,
        MatAutocomplete,
      ],
      providers: [{ provide: Store, useValue: storeMock }],
    }).compileComponents();
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should reset page and dispatch searchEmpty action when search query is empty', () => {
    // Test onSearchChange with an empty query
    component.onSearchChange('');
    expect(component.selectedPage).toBe(1);
    expect(storeMock.dispatch).toHaveBeenCalledWith(searchEmpty());
  });

  it('should call runSearch method when search query is not empty', () => {
    // Test onSearchChange with a non-empty query
    component.onSearchChange('sample query');
    expect(component.selectedPage).toBe(1);
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      runSearch({ query: 'sample query', page: 1, size: 10 })
    );
  });

  it('should update selectedPage and selectedSize when onPageChange is called', () => {
    // Test onPageChange with a PageChanges object
    const pageChanges: PageChanges = { pageIndex: 2, pageSize: 20 };
    component.onPageChange(pageChanges);
    expect(component.selectedPage).toBe(2);
    expect(component.selectedSize).toBe(20);
  });

  it('should call runSearch method with correct parameters when onPageChange is called', () => {
    // Test onPageChange with a PageChanges object
    const pageChanges: PageChanges = { pageIndex: 3, pageSize: 30 };
    component.onPageChange(pageChanges);
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      runSearch({ query: component.queryText, page: 3, size: 30 })
    );
  });

  it('should dispatch runSearch action and update suggestions$ when runSearch is called', () => {
    // Mock the getAutocomplateQueries selector and test suggestions$ update
    const query = 'sample query';
    const page = 2;
    const size = 15;
    const mockSuggestions: string[] = ['suggestion1', 'suggestion2'];

    storeMock.select.and.returnValue(of(['suggestion1', 'suggestion2'])); // Mock the selector

    testScheduler.run(({ expectObservable }) => {
      component['runSearch'](query, page, size);

      expectObservable(component.suggestions$).toBe('(a|)', {
        a: mockSuggestions,
      });
    });

    expect(storeMock.dispatch).toHaveBeenCalledWith(
      runSearch({ query, page, size })
    );
  });
});
