import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from './home-page/home/home.component';
import { AboutComponent } from './about-page/about/about.component';
import { RouterModule } from '@angular/router';
import { SearchPageComponent } from './search/pages/search-page/search-page.component';
import { ResultCardComponent } from './search/components/result-card/result-card.component';
import { SearchFieldComponent } from './search/components/search-field/search-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { searchReducer } from './search/stores/reducers/search.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SearchEffects } from './search/stores/effects/search.effects';
import { ResultsListComponent } from './search/components/results-list/results-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    SearchPageComponent,
    ResultCardComponent,
    SearchFieldComponent,
    ResultsListComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forRoot({ search: searchReducer }),
    EffectsModule.forRoot([SearchEffects]),
    SharedModule,
  ],
})
export class FeaturesModule {}
