import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [PaginatorComponent, LoaderComponent],
  exports: [PaginatorComponent, LoaderComponent],
  imports: [CommonModule, MatPaginatorModule, MatProgressSpinnerModule],
})
export class SharedModule {}
